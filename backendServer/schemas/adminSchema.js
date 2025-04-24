const mongoose = require("mongoose");
const User = require("./userSchema");

const administratorSchema = new mongoose.Schema({
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
    }
});

const Administrator = mongoose.model("Administrator", administratorSchema);
module.exports = Administrator;
