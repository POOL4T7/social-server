const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
    {
        members: [{ type: String, ref: "User" }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Chat", chatModel);