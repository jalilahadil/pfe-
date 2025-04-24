const express = require("express");
const router = express.Router();
const {
    getCoursesByCategoryId,
    getCoursesByCreatorId,
    getCourseById,
    getAllCourses,
    deleteCourse,
    updateCourse,
    addCourse
} = require("../controller/courseController");

// 🔍 Get courses by category ID
router.get("/courses/getByCategoryId/:categoryId", getCoursesByCategoryId);

// 🔍 Get courses by creator ID
router.get("/courses/getByCreatorId/:creatorId", getCoursesByCreatorId);

// 🔍 Get a single course by ID
router.get("/courses/getById/:id", getCourseById);

// 📜 Get all courses
router.get("/courses/getAllCourses/", getAllCourses);

// ❌ Delete a course by ID
router.delete("/courses/deleteOne/:id", deleteCourse);

// 🔄 Update a course by ID
router.put("/courses/updateOne/:id", updateCourse);
// 🔄 Update a course by ID
router.post("/courses/addCourse/", addCourse);

module.exports = router;
