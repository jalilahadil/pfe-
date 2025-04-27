const express = require("express");
const router = express.Router();
const { 
    getQuestionById, 
    getQuestionsByQuizId, 
    getAllQuestions, 
    createQuestion, 
    deleteQuestion, 
    updateQuestion 
} = require("../controller/questionController");

// 🔍 Get question by ID
router.get("/questions/getById/:id", getQuestionById);

// 🔍 Get questions by quiz ID
router.get("/questions/getByQuizId/:quizId", getQuestionsByQuizId);

// 📜 Get all questions
router.get("/questions/getAll", getAllQuestions);

// ➕ Create a new question
router.post("/questions/postNewQuestion/", createQuestion);

// ❌ Delete a question by ID
router.delete("/questions/deleteOne/:id", deleteQuestion);

// 🔄 Update a question by ID
router.put("/questions/updateOne/:id", updateQuestion);

module.exports = router;
