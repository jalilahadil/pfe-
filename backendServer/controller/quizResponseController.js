const QuizResponse = require("../schemas/quizResponse"); // Import the QuizResponse model

// Create or update a quiz response
const createQuizResponse = async (req, res) => {
  try {
    // Extract the necessary data from the request body
    const { totalPoints, quizId, responseDate, studentId } = req.body;

    // First, delete any existing response with the same studentId and quizId
    await QuizResponse.deleteMany({ studentId, quizId });

    // Create a new quiz response
    const newResponse = new QuizResponse({
      totalPoints,
      quizId,
      responseDate,
      studentId,
    });

    // Save the new response to the database
    await newResponse.save();

    // Send a success response
    res.status(201).json({
      message: 'Quiz response saved successfully!',
      data: newResponse,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error saving quiz response:', error);
    res.status(500).json({
      message: 'An error occurred while saving the quiz response.',
      error: error.message,
    });
  }
};

// Get quiz responses by quizId
const getQuizResponsesByQuizId = async (req, res) => {
  const { quizId } = req.params;

  try {
    // Find quiz responses by quizId
    const responses = await QuizResponse.find({ quizId });

    if (!responses) {
      return res.status(404).json({
        message: 'No responses found for this quiz.',
      });
    }

    res.status(200).json({
      message: 'Quiz responses retrieved successfully!',
      data: responses,
    });
  } catch (error) {
    console.error('Error retrieving quiz responses:', error);
    res.status(500).json({
      message: 'An error occurred while retrieving the quiz responses.',
      error: error.message,
    });
  }
};
// Get quiz responses by quizId
const getQuizResponsesByStudentId = async (req, res) => {
  const  studentId  = req.params.studentId;

  try {
    console.log(studentId)
    // Find quiz responses by quizId
    const responses = await QuizResponse.find({ studentId:studentId });

    if (!responses) {
      return res.status(404).json({
        message: 'No responses found for this quiz.',
      });
    }

    res.status(200).json({
      message: 'Quiz responses retrieved successfully!',
      data: responses,
    });
  } catch (error) {
    console.error('Error retrieving quiz responses:', error);
    res.status(500).json({
      message: 'An error occurred while retrieving the quiz responses.',
      error: error.message,
    });
  }
};
// Get quiz responses by quizId and studentId
const getQuizResponsesByQuizIdAndStudentId = async (req, res) => {
  const { quizId, studentId } = req.params;

  try {
    const responses = await QuizResponse.find({ quizId, studentId });

    if (responses.length === 0) {
      return res.status(404).json({ message: 'No responses found for the given quizId and studentId.' });
    }

    res.status(200).json(responses);
  } catch (error) {
    console.error('Error retrieving quiz responses:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Delete quiz response by responseId
const deleteQuizResponseById = async (req, res) => {
  const { responseId } = req.params;

  try {
    const response = await QuizResponse.findByIdAndDelete(responseId);

    if (!response) {
      return res.status(404).json({ message: 'Quiz response not found.' });
    }

    res.status(200).json({ message: 'Quiz response deleted successfully.' });
  } catch (error) {
    console.error('Error deleting quiz response:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
module.exports = {
  createQuizResponse,
  getQuizResponsesByQuizId,
  getQuizResponsesByQuizIdAndStudentId,
  deleteQuizResponseById,
  getQuizResponsesByStudentId
};
