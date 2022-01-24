"use strict";
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "pool"],
        required: true,
        default: "user",
    },
    status: {
        type: String,
        enum: ["active", "suspended", "blocked"],
        default: "active",
    },
});

module.exports = mongoose.model("User", UserSchema);
