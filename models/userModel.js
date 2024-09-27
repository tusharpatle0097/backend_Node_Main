const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        index: true // Added index for performance on unique email field
    },
    phone: {
        type: Number,
        required: true,
        min: 10 
    },
    message: {
        type: String,
        required: true
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
