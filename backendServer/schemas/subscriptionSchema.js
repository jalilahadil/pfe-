const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    },
    subscribedStatus: {
        type: String,
        default: "waiting"
    },
    totalPoints: {
        type: Number,
        default: 0
    },
    terminatedLessons: {
        type: String,
        default:""
    },
    
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;