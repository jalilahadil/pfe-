const {Question}=require("../schemas/questionSchema");
// 🔍 Search: Retrieves a specific question by its unique ID
const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }

        res.status(200).json(question);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 🔍 Search: Retrieves all questions associated with a specific quiz ID
const getQuestionsByQuizId = async (req, res) => {
    try {
        const questions = await Question.find({ quizId: req.params.quizId });

        if (!questions || questions.length === 0) {
            return res.status(404).json({ error: "No questions found for this quiz" });
        }

        res.status(200).json(questions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 📜 Fetch: Retrieves all questions from the database
const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// ➕ Add: Creates a new question and saves it to the database
const createQuestion = async (req, res) => {
    try {
        const { text, options, correctAnswer, points, quizId } = req.body;

        const newQuestion = new Question({
            text,
            options,
            correctAnswer,
            points,
            quizId
        });

        await newQuestion.save();

        res.status(201).json({ message: "Question created successfully", question: newQuestion });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// ❌ Delete: Deletes a question by its unique ID
const deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);

        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }

        res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 🔄 Update: Updates an existing question with new data
const updateQuestion = async (req, res) => {
    try {
        const { text, options, correctAnswer, points, quizId } = req.body;

        const updatedQuestion = await Question.findByIdAndUpdate(
            req.params.id,
            { text, options, correctAnswer, points, quizId },
            { new: true, runValidators: true }
        );

        if (!updatedQuestion) {
            return res.status(404).json({ error: "Question not found" });
        }

        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports=
{
    getQuestionById,
    getQuestionsByQuizId,
    getAllQuestions,
    createQuestion,
    deleteQuestion,
    updateQuestion,
    }