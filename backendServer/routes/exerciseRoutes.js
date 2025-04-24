const express = require("express");
const router = express.Router();
const {
    getExercisesByLessonId,
    getExerciseById,
    getAllExercises,
    deleteExercise,
    updateExercise
} = require("../controller/exerciseController");

// 🔍 Get exercises by lesson ID
router.get("/exercises/getByLessonId/:lessonId", getExercisesByLessonId);

// 🔍 Get a single exercise by ID
router.get("/exercises/getById/:id", getExerciseById);

// 📜 Get all exercises
router.get("/exercises/getAll", getAllExercises);

// ❌ Delete an exercise by ID
router.delete("/exercises/deleteOne/:id", deleteExercise);

// 🔄 Update an exercise by ID
router.put("/exercises/updateOne/:id", updateExercise);

module.exports = router;
