const ProfileModel = require("../models/ProfileModel");
const UUID = require("uuid");

var ProfileServices = {
    getProfileData: async function (
        filter = {},
        select = [],
        sort = { _id: -1 },
        skip = 0,
        limit = 1
    ) {
        var data = [];

        try {
            var data = await ProfileModel.find(filter)
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
    addProfile: async function (userData) {
        var data;
        try {
            var userId = await UUID.v4();
            userData.userId = userId.toString();

            var userObject = new ProfileModel(userData);
            var data = await userObject.save();
        } catch (e) {
            console.log(e);
        }
        return data;
    },
    updateProfileDetails: async function (filter, updateData) {
        let data = {};
        try {
            data = await ProfileModel.findOneAndUpdate(filter, updateData, {
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

module.exports = ProfileServices;