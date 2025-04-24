const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    userLastName :
    {
        type:String,
        required:true
    },
    userFirstName :
    {
        type:String,
        required:true
    },
    userEmail :
    {
        type:String,
        required:true,
        unique:true
    },
    userPassword :
    {
        type:String,
        required:true
    },
    userPhoneNumber :
    {
        type:String,
        required:true
    },
    userBirthDate :
    {
        type:Date,
        required:true
    },
    createdAt :
    {
        type:Date,
        required:true,
        default:Date.now
    },
  
    userGender :
    {
        type:String,
        required:true
    },
    userCountry :
    {
        type:String,
        required:true
    },
    userCity :
    {
        type:String,
        required:true
    },
    userAddress :
    {
        type:String,
        required:true
    },
    specialty: {
        type: String,
        required: true
    },
    teachingLevel: {
        type: String,
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true
    },
    accountStatus: {
        type: String,
        required:true,
        default:"waiting"
    }
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
