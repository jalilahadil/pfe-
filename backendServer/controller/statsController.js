const Student = require("../schemas/studentSchema");
const Teacher = require("../schemas/teacherSchema");
const Exercice = require("../schemas/exerciseSchema");
const Cours = require("../schemas/courseSchema");
const Category = require("../schemas/categorySchema");
const Lesson = require("../schemas/lessonSchema");
const Chapter = require("../schemas/lessonSchema");
const Assignment = require("../schemas/assignmentSchema");
const Subscriptions = require("../schemas/subscriptionSchema");
const QuizResponse = require("../schemas/quizResponse");
const Questions = require("../schemas/questionSchema");

const findStats = async (req, res) => {
  try {
    // Use countDocuments() to avoid fetching all documents
    const statStudent = await Student.countDocuments();
    const statTeacher = await Teacher.countDocuments();
    const statExercice = await Exercice.countDocuments();
    const statCours = await Cours.countDocuments();
    const statCategory = await Category.countDocuments();
    const statLesson = await Lesson.countDocuments();
    const statChapter = await Chapter.countDocuments();
    const assignment = await Assignment.countDocuments();
    const subscription = await Subscriptions.countDocuments();
    const quizResponse = await QuizResponse.countDocuments();
    const questions = await Questions.countDocuments();

    res.status(200).json({
      statStudent,
      statTeacher,
      statExercice,
      statCours,
      statCategory,
      statLesson,
      statChapter,
      assignment,
      subscription,
      quizResponse,
      questions
    });
  } catch (error) {
    console.error("Error fetching stats: ", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getSubscriptionStats = async (req, res) => {
    try {
      // Total Subscriptions
      const totalSubscriptions = await Subscriptions.countDocuments();
  
      // Active vs Waiting Subscriptions
      const activeSubscriptions = await Subscriptions.countDocuments({ subscribedStatus: "active" });
      const waitingSubscriptions = await Subscriptions.countDocuments({ subscribedStatus: "waiting" });
  
      // Subscriptions per Course
      const subscriptionsPerCourse = await Cours.aggregate([
        {
          $lookup: {
            from: "subscriptions",  // Make sure "subscriptions" matches your collection name in MongoDB
            localField: "_id",
            foreignField: "courseId",
            as: "subscriptions"
          }
        },
        {
          $project: {
            courseName: 1,
            numSubscriptions: { $size: "$subscriptions" }
          }
        }
      ]);
  
      // Subscriptions per Student
      const subscriptionsPerStudent = await Student.aggregate([
        {
          $lookup: {
            from: "subscriptions",  // Ensure "subscriptions" is correct
            localField: "_id",
            foreignField: "studentId",
            as: "subscriptions"
          }
        },
        {
          $project: {
            userName: 1,
            numSubscriptions: { $size: "$subscriptions" }
          }
        }
      ]);
  
      // Points per Subscription (sum total points)
      const totalPoints = await Subscriptions.aggregate([
        { $group: { _id: null, totalPoints: { $sum: "$totalPoints" } } }
      ]);
  
      const avgPoints = totalPoints[0] ? totalPoints[0].totalPoints / totalSubscriptions : 0;
  
      // Terminated Lessons (if there's any specific format you wish to extract terminated lessons)
      const terminatedLessonsStats = await Subscriptions.aggregate([
        { $match: { terminatedLessons: { $ne: "" } } },
        { $group: { _id: "$terminatedLessons", count: { $sum: 1 } } }
      ]);
  
      // New Subscriptions Over Time (group by date of subscription)
      const newSubscriptionsOverTime = await Subscriptions.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$subscribedAt" } },
            total: { $sum: 1 }
          }
        },
        { $sort: { "_id": 1 } }
      ]);
  
      // Return the results
      return res.status(200).json({
        totalSubscriptions,
        activeSubscriptions,
        waitingSubscriptions,
        subscriptionsPerCourse,
        subscriptionsPerStudent,
        avgPoints,
        terminatedLessonsStats,
        newSubscriptionsOverTime
      });
      
    } catch (error) {
      console.error("Error fetching subscription stats: ", error);
      return res.status(500).json({ message: "Server Error" });
    }
  };
  
  

  module.exports = {
    findStats,
    getSubscriptionStats
  };