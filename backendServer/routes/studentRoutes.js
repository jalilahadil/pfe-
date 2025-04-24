const express = require("express");
const router = express.Router();
const { 
    getStudentById, 
    getStudentByUserId, 
    getAllStudents, 
    createStudent, 
    updateStudent, 
    deleteStudent 
} = require("../controller/studentController");

// 🔍 Get student by ID
router.get("/students/getById/:id", getStudentById);

// 🔍 Get student by user ID (foreign key reference)
router.get("/students/getByUserId/:userId", getStudentByUserId);

// 📜 Get all students
router.get("/students/getAllStudents", getAllStudents);

// ➕ Create a new student
router.post("/students/addNewStudent/", createStudent);

// 🔄 Update a student by ID
router.put("/students/updateOne/:id", updateStudent);

// ❌ Delete a student by ID
router.delete("/students/deleteOne/:id", deleteStudent);

module.exports = router;
