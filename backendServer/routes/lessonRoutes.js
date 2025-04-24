const express = require("express");
const router = express.Router();
const {
    getLessonsByChapterId,
    getLessonById,
    getAllLessons,
    deleteLesson,
    updateLesson,
    addLesson
} = require("../controller/lessonController");

// 🔍 Get lessons by chapter ID
router.get("/lessons/getByChapterId/:chapterId", getLessonsByChapterId);

// 🔍 Get a single lesson by ID
router.get("/lessons/getById/:id", getLessonById);

// 📜 Get all lessons
router.get("/lessons/getAll", getAllLessons);

// ❌ Delete a lesson by ID
router.delete("/lessons/deleteOne/:id", deleteLesson);

// 🔄 Update a lesson by ID
router.put("/lessons/updateOne/:id", updateLesson);

// 🔄 Post a lesson by ID
router.post("/lessons/addOne/", addLesson);

module.exports = router;
