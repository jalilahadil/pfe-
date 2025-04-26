const mongoose = require("mongoose");

const assignemtnSchema = new mongoose.Schema({
    exerciceId: {
        type: String,
        required: true
    },
    accomplishDate: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
    ,
    note: {
        type: Number,
        required: true,
        default:0
    },
    response: {
        type: String,
        required: true,

    }
});

const Assignment = mongoose.model("Assignment", assignemtnSchema);
module.exports = Assignment;