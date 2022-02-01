const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
    {
        senderId: { type: String, ref: "User" },
        text: { type: String, trim: true },
        chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);