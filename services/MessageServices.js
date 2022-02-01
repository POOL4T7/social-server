"use strict";
const MessageModel = require("../models/MessageModel");

var UserServices = {
    getMessageData: async function (
        filter = {},
        select = [],
        sort = {},
        skip = 0,
        limit = {}
    ) {
        var data = [];

        try {
            var data = await MessageModel.find(filter)
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
    addMessage: async function (chatData) {
        var data = {};
        try {
            var messageObject = new MessageModel(chatData);
            var data = await messageObject.save();
        } catch (e) {
            console.log(e);
        }
        return data;
    },
};

module.exports = UserServices;
