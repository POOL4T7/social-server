"use strict";
const ProfileServices = require("../services/ProfileServices");

var UserController = {
    UserProfile: async function (req, res) {
        try {
            let profiles = await ProfileServices.getProfileData({
                userId: req.user.key,
            });
            if (profiles.length > 0) {
                var profile = profiles[0];
                let data = await ProfileServices.updateProfileDetails(
                    { userId: req.user.key },
                    {
                        name: req.body.name || profile.name,
                        bio: req.body.bio || profile.bio,
                        gender: req.body.gender || profile.gender,
                        age: req.body.age || profile.age,
                    }
                );
                var response = {
                    success: 1,
                    msg: "Profile updated",
                    data: data,
                };
                return res.status(200).json(response);
            } else {
                let profile = await ProfileServices.addProfile({
                    username: req.body.username,
                    name: req.body.name,
                    bio: req.body.bio,
                    gender: req.body.gender,
                    age: req.body.age,
                    country: req.body.country,
                });
                var response = {
                    success: 1,
                    msg: "User profile added",
                    data: profile,
                };
                return res.status(201).json(response);
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
    getUserProfile: async function (req, res) {
        try {
            let profiles = await ProfileServices.getProfileData({
                userId: req.user.key,
            });
            if (profiles.length > 0) {
                var profile = profiles[0];
                var response = {
                    success: 1,
                    msg: "User profile",
                    data: profile,
                };
                return res.status(200).json(response);
            } else {
                var response = {
                    success: 0,
                    msg: "Profile not found",
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
