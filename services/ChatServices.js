"use strict";
const ChatModel = require("../models/ChatModel");

var UserServices = {
    getChatData: async function (
        filter = {},
        select = [],
        sort = { _id: -1 },
        skip = 0,
        limit = 1
    ) {
        var data = [];

        try {
            var data = await ChatModel.find(filter)
                .select(select)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .lean();
        } catch (e) {
            console.log(e);
        }
        return data;
    },
    addChat: async function (chatData) {
        var data;
        try {
            var chatObject = new ChatModel(chatData);
            var data = await chatObject.save();
        } catch (e) {
            console.log(e);
        }
        return data;
    },
    deleteChat: async function (filter) {
        try {
            var data = await ChatModel.deleteOne(filter);
            console.log("deleted data: ", data);
        } catch (e) {
            console.log(e.message);
        }
    },
};

module.exports = UserServices;
