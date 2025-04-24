const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    chapterId: {
        type: String,
        required: true
    },
    attachmentLink: {
        type: String,
        required: true
    }
});

const Lesson = mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;