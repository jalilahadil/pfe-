const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../schemas/userSchema'); // Adjust the path if necessary
const {Student} = require('../schemas/studentSchema');  // Adjust the path as necessary
const {Teacher} = require('../schemas/teacherSchema');  // Adjust the path as necessary
const {Administrator} = require('../schemas/adminSchema');  // Adjust the path as necessary

// 🗝️ Login: Authenticates a user based on email and password
const loginUser = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        console.log(req.body)
        // 1. Check if the user exists
        const user = await User.findOne({ userEmail });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials: User not found" });
        }

        // 2. Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid credentials: Incorrect password" });
        }
        console.log(process.env.JWT_SECRET_KEY)
        // 3. Generate a JWT token for the user
        const token = jwt.sign(
            { user },
            process.env.JWT_SECRET_KEY, // Secret key for JWT, should be stored in an environment variable
            { expiresIn: '8h' } // Token expiration time (e.g., 1 hour)
        );

        // 4. Return the token and user data
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                userId: user._id,
                userEmail: user.userEmail,
                userFirstName: user.userFirstName,
                userLastName: user.userLastName
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// 🧑‍🏫 Find the role of the user by checking which collection contains their ID
const getUserRole = async (req, res) => {
    try {
        const { userId } = req.params;  // User ID is passed in the URL parameter

        // Check if userId exists in the Student collection
        const student = await Student.findOne({ user: userId });
        if (student) {
            return res.status(200).json({
                message: "User is a student",
                role: 'student'
            });
        }

        // Check if userId exists in the Teacher collection
        const teacher = await Teacher.findOne({ user: userId });
        if (teacher) {
            return res.status(200).json({
                message: "User is a teacher",
                role: 'teacher'
            });
        }

        // Check if userId exists in the Administrator collection
        const administrator = await Administrator.findOne({ user: userId });
        if (administrator) {
            return res.status(200).json({
                message: "User is an administrator",
                role: 'administrator'
            });
        }

        // If userId doesn't exist in any collection, return not found
        return res.status(404).json({
            message: "User not found in any role"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { loginUser ,getUserRole };
