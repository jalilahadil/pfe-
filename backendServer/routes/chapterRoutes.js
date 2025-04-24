const express = require("express");
const router = express.Router();
const {
    getChapterByTitle,
    getChaptersByCourseId,
    getChapterById,
    getAllChapters,
    deleteChapter,
    updateChapter,
    createChapter
} = require("../controller/chapterController"); // Adjust the path if needed

// 📜 Get all chapters
router.get("/chapters/getAll", getAllChapters);

// 🔍 Get chapter by title
router.get("/chapters/getByTitle/:title", getChapterByTitle);

// 🔍 Get chapter by ID
router.get("/chapters/getById/:id", getChapterById);

// 🔍 Get chapters by course ID
router.get("/chapters/getByCourseId/:courseId", getChaptersByCourseId);

// 🔄 Update chapter
router.put("/chapters/updateOne/:id", updateChapter);

// 🔄 Post chapter
router.post("/chapters/createChapter/", createChapter);

// ❌ Delete chapter
router.delete("/chapters/deleteOne/:id", deleteChapter);

module.exports = router;
