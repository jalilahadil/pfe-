const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: String,
        required: true
    },
    chapters: {
        type: [String], 
        default: []
    },
    lessonsCount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;