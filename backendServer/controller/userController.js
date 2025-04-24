const User=require("../schemas/userSchema");
const bcrypt=require("bcrypt")
const Teacher =require("./../schemas/teacherSchema")
const Admin =require("./../schemas/adminSchema")
const Student =require("./../schemas/studentSchema")
const jwt=require("jsonwebtoken")
// 🔍 Search: Retrieves a user by their unique ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 🔍 Search: Retrieves a user by their email address
const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ userEmail: req.params.email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 📜 Fetch: Retrieves all users from the database
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// ➕ Add: Creates a new user and saves them to the database
const loginUser = async (req, res) => {
    try {
    const { userEmail, userPassword } = req.body;
    const isTeacher=await Teacher.findOne({userEmail:userEmail});
    const isAdmin=await Admin.findOne({userEmail:userEmail});
    const isStudent=await Student.findOne({userEmail:userEmail});
    if(isTeacher)
    {
        const validPassword=await bcrypt.compare(userPassword,isTeacher.userPassword)
        if(validPassword)
        {
            const token = jwt.sign(
                        { isTeacher },
                        process.env.JWT_SECRET_KEY, // Secret key for JWT, should be stored in an environment variable
                        { expiresIn: '8h' } // Token expiration time (e.g., 1 hour)
                    );
            
            res.status(200).json({message:"Login Success. Waiting to be redirected to Home Page ",user:isTeacher,"role":"teacher",token})
        }
        else 
        {
            res.status(200).json({message:"Login Error , Password Incorrect . Please Try Again",user:{}})
        }
    }
    else if (isAdmin)
    {
        const validPassword=await bcrypt.compare(userPassword,isAdmin.userPassword)
        if(validPassword)
        {
            const token = jwt.sign(
                { isAdmin },
                process.env.JWT_SECRET_KEY, // Secret key for JWT, should be stored in an environment variable
                { expiresIn: '8h' } // Token expiration time (e.g., 1 hour)
            );
    
            res.status(200).json({message:"Login Success. Waiting to be redirected to Home Page ",user:isAdmin,"role":"admin",token})
        }
        else 
        {
                res.status(200).json({message:"Login Error , Password Incorrect . Please Try Again",user:{}})
        }
    }
    else if (isStudent)
        {
            const validPassword=await bcrypt.compare(userPassword,isStudent.userPassword)
            if(validPassword)
            {
                const token = jwt.sign(
                    { isStudent },
                    process.env.JWT_SECRET_KEY, // Secret key for JWT, should be stored in an environment variable
                    { expiresIn: '8h' } // Token expiration time (e.g., 1 hour)
                );
        
                res.status(200).json({message:"Login Success. Waiting to be redirected to Home Page ",user:isStudent,"role":"student",token})
            }
            else 
            {
                    res.status(200).json({message:"Login Error , Password Incorrect . Please Try Again",user:{}})
            }
        }
    else 
    {
         
        
         res.status(200).json({message:"Login Error , No Account Matching  . Please Check Your Email ",user:{}})
        
    }
     console.log(isAdmin)

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
};
// 🔄 Update: Updates an existing user's information based on their ID
// ✏️ Update: Updates a user's details, including password if provided
const updateUser = async (req, res) => {
    try {
        const { userLastName, userFirstName, userPhoneNumber, userBirthDate, userPhoto, userGender, userCountry, userCity, userAddress, newPassword } = req.body;

        // Prepare the data to be updated
        const updateData = { userLastName, userFirstName, userPhoneNumber, userBirthDate, userPhoto, userGender, userCountry, userCity, userAddress };

        // If a new password is provided, hash it and add it to the updateData
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10); // Assuming bcrypt is being used for hashing passwords
            updateData.userPassword = hashedPassword; // Assuming the password field in the schema is called userPassword
        }

        // Perform the update operation
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        // Handle case where user is not found
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Return the updated user details
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ❌ Delete: Deletes a user by their unique ID
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports=
{
    getUserById,
    getUserByEmail,
    getAllUsers,
    loginUser,
    updateUser,
    deleteUser,
}