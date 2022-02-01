'use strict'
const ChatServices = require("../services/ChatServices")

var ChatController = {
    createChat: async function (req, res) {
        try {
            var chatData = {
                members: [req.body.senderId, re.body.receiverId]
            }
            var data = ChatServices.addChat(chatData)
            if (data) {
                var response = {
                    success: 1,
                    msg: "Chat Added",
                };
                return res.status(500).json(response);
            } else {
                var response = {
                    success: 0,
                    msg: "Something went wrong",
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
    getChat: async function (req, res) {
        try {
            var filter = {
                members: { $in: [req.user.userId] }
            }
            var data = await ChatServices.getChatData(filter)
            var response = {
                success: 0,
                msg: "get user chat",
                data: data,
            };
            return res.status(200).json(response);
        } catch (e) {
            var response = {
                success: 0,
                msg: "Server error",
                error: e.message,
            };
            return res.status(500).json(response);
        }
    },
    getConBtwTwoUser: async function (req, res) {
        try {
            var filter = {
                members: { $all: [req.user.userId, req.params.userId] },
            };
            var data = await ChatServices.getChatData(filter)
            var response = {
                success: 0,
                msg: "get user chat",
                data: data,
            };
            return res.status(200).json(response);
        } catch (e) {
            response = {
                success: 0,
                msg: "Something went wrong",
                error: e.message,
            };
            return res.status(500).json(response);
        }
    },
}

module.exports = ChatController