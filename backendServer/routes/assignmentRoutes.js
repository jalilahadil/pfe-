// Import the Express library
const express = require('express');
// Create a new router instance
const router = express.Router();
// Import the controller functions for assignment operations
const controller = require('../controller/assignmentController');

// POST /assignment/addAssignment/
router.post('/assignment/addAssignment/', controller.createAssignment);

//Retrieve all assignments
router.get('/assignment/getAllAssignments/', controller.getAllAssignments);

//Get a single assignment by its ID
router.get('/assignment/getAssignmentById/:id', controller.getAssignmentById);

//Get all assignments submitted by a specific user (userId passed in params)
router.get('/assignment/getAssignmentByUserId/:id', controller.getAssignmentsByUserId);

//Update an assignment by its ID
router.put('/assignment/updateAssignment/:id', controller.updateAssignment);

//Delete an assignment by its ID
router.delete('/assignment/deleteAssignment/:id', controller.deleteAssignment);

// Export the router to be used in the main app
module.exports = router;
