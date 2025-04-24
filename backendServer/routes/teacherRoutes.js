const express = require("express");
const router = express.Router();
const { 
    getTeacherById, 
    getTeacherByUserId, 
    getAllTeachers, 
    createTeacher, 
    updateTeacher, 
    deleteTeacher 
} = require("../controller/teacherController");

// 🔍 Get teacher by ID
router.get("/teachers/getById/:id", getTeacherById);

// 🔍 Get teacher by user ID
router.get("/teachers/getByUserId/:userId", getTeacherByUserId);

// 📜 Get all teachers
router.get("/teachers/getAllTeachers/", getAllTeachers);

// ➕ Create a new teacher
router.post("/teachers/addNewTeacher/", createTeacher);

// 🔄 Update a teacher by ID
router.put("/teachers/updateOne/:id", updateTeacher);

// ❌ Delete a teacher by ID
router.delete("/teachers/deleteOne/:id", deleteTeacher);

module.exports = router;
