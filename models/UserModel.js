"use strict";
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    userId: {
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
        default: "user",
    },
    status: {
        type: String,
        enum: ["active", "suspended", "blocked"],
        default: "active",
    },
    profileDetails: {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        profile: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
            default: "",
        },
        country: {
            type: String,
            default: "",
        },
        age: {
            type: String,
            default: "A",
        },
        gender: {
            type: String,
            enum: ["Male", "Female"],
            required: true,
        },
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    settings: {
        protected: {
            type: Boolean,
            default: false,
        },
        newsletter: {
            type: Boolean,
            default: false,
        },
    },
});

module.exports = mongoose.model("User", UserSchema);
