"use strict";
const UserModel = require("../models/UserModel");
const UUID = require("uuid");

var UserServices = {
    getUserData: async function (
        filter = {},
        select = [],
        sort = { _id: -1 },
        skip = 0,
        limit = 1
    ) {
        var data = [];

        try {
            var data = await UserModel.find(filter)
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
    addUser: async function (userData) {
        var data;
        try {
            var userId = await UUID.v4();
            userData.key = userId.toString();

            var userObject = new UserModel(userData);
            var data = await userObject.save();
        } catch (e) {
            console.log(e);
        }
        return data;
    },
    updateUserDetails: async function (filter, updateData) {
        let data = {};
        try {
            data = await UserModel.findOneAndUpdate(filter, updateData, {
                multi: false,
                new: true,
            });
            return data;
        } catch (err) {
            console.log(err);
            return data;
        }
    },
};

module.exports = UserServices;
