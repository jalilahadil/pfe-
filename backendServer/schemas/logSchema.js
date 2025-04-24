const mongoose = require("mongoose");

const loginHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    loginTimestamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    logoutTimestamp: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const LoginHistory = mongoose.model("LoginHistory", loginHistorySchema);
module.exports = { LoginHistory };
