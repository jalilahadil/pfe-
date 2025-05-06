const Student=require("../schemas/studentSchema");
const bcrypt=require("bcrypt");
// 🔍 Search: Retrieves a student by their unique ID
const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('user');

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 🔍 Search: Retrieves a student by the user ID (foreign key reference)
const getStudentByUserId = async (req, res) => {
    try {
        const student = await Student.findOne({ _id: req.params.userId });

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// 📜 Fetch: Retrieves all students from the database
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// ➕ Add: Creates a new student and saves them to the database
const createStudent = async (req, res) => {
    try {
        var { userLastName,
            userFirstName,
            userEmail,
            userPassword,
            userPhoneNumber,
            userBirthDate,
            userGender,
            userCountry,
            userCity,
            userAddress,
            educationLevel,
            school
            
        } = req.body;
        console.log(req.body)
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userPassword, saltRounds);
        
        const newStudent = new Student({
            userLastName,
            userFirstName,
            userEmail,
            userPassword:hashedPassword,
            userPhoneNumber,
            userBirthDate,
            userGender,
            userCountry,
            userCity,
            userAddress,
            educationLevel,
            school,
            totalPoints:0
        });
       
        await newStudent.save();

        res.status(200).json({ message: "Student created successfully", student: newStudent });
    
    } 
    catch (error) {
        console.log({ error: error.message });
        res.status(400).json({ error: error.message });
    }
};
// 🔄 Update: Updates an existing student's information based on their ID
const updateStudent = async (req, res) => {
    try {
        const {userLastName,
            userFirstName,
            userBirthDate,
            userEmail,
            userPassowrd,
            userPhoneNumber,
        accountStatus}=req.body
        const data={userLastName,
            userFirstName,
            userBirthDate,
            userEmail,
            userPassowrd,
            userPhoneNumber,accountStatus}
      
        const updatedStudent = await Student.findByIdAndUpdate(
            req.body._id,
            data ,
            { new: true, runValidators: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// ❌ Delete: Deletes a student by their unique ID
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports={
    getStudentById,
    getStudentByUserId,
    getAllStudents,
    createStudent,
    updateStudent,
    deleteStudent,
}
