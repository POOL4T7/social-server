"use strict";
const UserServices = require("../services/UserServices");

var UserController = {
    getOwnProfile: async function (req, res) {
        try {
            let user = req.user;
            return res.send(user);
        } catch (e) {
            var response = {
                success: 0,
                msg: "Server error",
                error: e.message,
            };
            return res.status(500).json(response);
        }
    },
    updateOwnProfile: async function (req, res) {
        try {
            var filter = {
                _id: req.body.id,
                userId: req.user.userId,
            };
            console.log('req.body', req.body);
            var profile = req.user.profileDetails;
            var formData = {
                $set: {
                    "profileDetails": {
                        name: req.body.name || profile.name,
                        bio: req.body.bio || profile.bio,
                        gender: req.body.gender || profile.gender,
                        age: req.body.age || profile.age,
                        username: req.body.username || profile.username,
                        profile: profile.profile,
                        country: profile.country,
                    }
                }
            };
            let data = await UserServices.updateUserDetails(filter, formData);
            var response = {};
            if (data) {
                response = {
                    success: 1,
                    msg: "Profile updated",
                    data: data,
                };
                return res.status(200).json(response);
            } else {
                response = {
                    success: 0,
                    msg: "Something went wrong",
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

module.exports = UserController;
