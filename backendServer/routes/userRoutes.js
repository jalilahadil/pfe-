const express = require('express');
const router = express.Router();
const {
    getUserById,
    getUserByEmail,
    getAllUsers,
    loginUser,
    updateUser,
    deleteUser
} = require('../controller/userController');

// Route for getting a user by their unique ID
router.get('/users/getUserById/:id', getUserById);

// Route for getting a user by their email address
router.get('/users/getUserByEmail/:email', getUserByEmail);

// Route for getting all users
router.get('/users/getAllUsers', getAllUsers);

// Route for creating a new user
router.post('/users/login', loginUser);

// Route for updating an existing user's details
router.put('/users/updateUser/:id', updateUser);

// Route for deleting a user by their unique ID
router.delete('/users/deleteUser/:id', deleteUser);

module.exports = router;
