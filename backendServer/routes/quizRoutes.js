const express = require("express");
const router = express.Router();
const { 
    getQuizById, 
    getQuizzesByLessonId, 
    getAllQuizzes, 
    createQuiz, 
    deleteQuiz, 
    updateQuiz 
} = require("../controller/quizController");

// 🔍 Get quiz by ID
router.get("/quizzes/getById/:id", getQuizById);

// 🔍 Get quizzes by lesson ID
router.get("/quizzes/getByLessonId/:lessonId", getQuizzesByLessonId);

// 📜 Get all quizzes
router.get("/quizzes/getAll", getAllQuizzes);

// ➕ Create a new quiz
router.post("/quizzes", createQuiz);

// ❌ Delete a quiz by ID
router.delete("/quizzes/deleteOne/:id", deleteQuiz);

// 🔄 Update a quiz by ID
router.put("/quizzes/updateOne/:id", updateQuiz);

module.exports = router;
