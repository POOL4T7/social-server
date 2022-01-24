"use strict";
const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
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
            default: "A"
        },
        gender: {
            type: String,
            enum: ["Male", "Female"],
            required: true,
        },
        protected: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
