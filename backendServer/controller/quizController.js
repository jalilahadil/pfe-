const {Quiz}=require("../schemas/quizSchema");
// 🔍 Search: Retrieves a specific quiz by its unique ID
const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }

        res.status(200).json(quiz);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 🔍 Search: Retrieves all quizzes associated with a specific lesson ID
const getQuizzesByLessonId = async (req, res) => {
    try {
        const quizzes = await Quiz.find({ lessonId: req.params.lessonId });

        if (!quizzes || quizzes.length === 0) {
            return res.status(404).json({ error: "No quizzes found for this lesson" });
        }

        res.status(200).json(quizzes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 📜 Fetch: Retrieves all quizzes from the database
const getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// ➕ Add: Creates a new quiz and saves it to the database
const createQuiz = async (req, res) => {
    try {
        const { title, description, lessonId } = req.body;

        const newQuiz = new Quiz({
            title,
            description,
            lessonId
        });

        await newQuiz.save();

        res.status(201).json({ message: "Quiz created successfully", quiz: newQuiz });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// ❌ Delete: Deletes a quiz by its unique ID
const deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);

        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }

        res.status(200).json({ message: "Quiz deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 🔄 Update: Updates an existing quiz with new data
const updateQuiz = async (req, res) => {
    try {
        const { title, description, lessonId } = req.body;

        const updatedQuiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            { title, description, lessonId },
            { new: true, runValidators: true }
        );

        if (!updatedQuiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }

        res.status(200).json(updatedQuiz);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports=
{
    getQuizById,
    getQuizzesByLessonId,
    getAllQuizzes,
    createQuiz,
    deleteQuiz,
    updateQuiz,
}
