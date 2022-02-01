"use strict";
const MessageServices = require("../services/MessageServices");
const ChatServices = require("../services/ChatServices");

var MessageController = {
    sendMessage: async function (req, res) {
        try {
            var filter = {
                members: { $all: [req.user.userId, req.params.userId] },
            };
            var chats = await ChatServices.getChatData(filter);
            if (chats.length > 0) {
                let chat = chats[0];
                var chatData = {
                    senderId: req.user.userId,
                    text: req.body.text,
                    chatId: chat._id,
                };
                var data = await MessageServices.addMessage(chatData);
                if (data) {
                    var response = {
                        success: 1,
                        msg: "Chat Added",
                        data: data,
                    };
                    console.log(response);
                    return res.status(200).json(response);
                } else {
                    var response = {
                        success: 0,
                        msg: "Something went wrong",
                    };
                    return res.status(400).json(response);
                }
            } else {
                var response = {
                    success: 0,
                    msg: "you have to follow him first",
                };
                return res.status(400).json(response);
            }
        } catch (e) {
            var response = {
                success: 0,
                msg: "Server error",
                error: e.message,
            };
            return res.status(500).json(response);
        }
    },
    getMessages: async function (req, res) {
        try {
            var filter = {
                members: { $all: [req.user.userId, req.params.userId] },
            };
            var chats = await ChatServices.getChatData(filter);
            if (chats.length > 0) {
                var chat = chats[0];
                var filter = {
                    chatId: chat._id,
                };
                var data = await MessageServices.getMessageData(filter);
                var response = {
                    success: 0,
                    msg: "Uses Messages",
                    data: data,
                };
                return res.status(200).json(response);
            } else {
                var response = {
                    success: 0,
                    msg: "Chat Not Found",
                };
                return res.status(404).json(response);
            }
        } catch (e) {
            var response = {
                success: 0,
                msg: "Server error",
                error: e.message,
            };
            return res.status(500).json(response);
        }
    },
};

module.exports = MessageController;
