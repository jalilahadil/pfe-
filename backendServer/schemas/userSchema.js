const mongoose=require("mongoose");

var userSchema=new mongoose.Schema(
   {
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
    userPhoto :
    {
        type:String,
        required:true
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
   } 
);
const User=mongoose.model("User",userSchema);
module.exports=User;
