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
            console.log("req.body", req.body);
            var profile = req.user.profileDetails;
            var formData = {
                $set: {
                    profileDetails: {
                        name: req.body.name || profile.name,
                        bio: req.body.bio || profile.bio,
                        gender: req.body.gender || profile.gender,
                        age: req.body.age || profile.age,
                        username: req.body.username || profile.username,
                        profile: profile.profile,
                        country: profile.country,
                    },
                },
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
    getUsersList: async function (req, res) {
        try {
            let users = await UserServices.getUserData(
                {},
                ["-password"],
                { _id: -1 },
                0,
                30
            );
            if (users.length > 0) {
                var response = {
                    success: 1,
                    msg: "Users List",
                    data: users,
                };
                return res.status(200).json(response);
            }
            var response = {
                success: 0,
                msg: "Users List NOT FOUND",
            };
            return res.status(404).json(response);
        } catch (e) {
            var response = {
                success: 0,
                msg: "Server error",
                error: e.message,
            };
            return res.status(500).json(response);
        }
    },
    followUser: async function (req, res) {
        try {
            if (req.params.userId === req.user.userId) {
                return res
                    .status(400)
                    .json({ success: 0, msg: "You can't follow yourself" });
            }
            var currentUser = await UserServices.getUserData({
                userId: req.params.userId,
            });
            if (currentUser.length > 0) {
               var user = currentUser[0];
                if (!user.followers.includes(req.user.userId)) {
                    await UserServices.updateUserDetails(
                        { userId: req.params.userId },
                        { $push: { followers: req.user.userId } }
                    );
                    await UserServices.updateUserDetails(
                        { userId: req.user.userId },
                        { $push: { followings: req.params.userId } }
                    );

                    var response = { success: 1, msg: "user has been followed" };
                    return res.status(200).json(response);
                } else {
                    var response = { success: 1, msg: "You already follow this user" };
                    return res.status(400).json(response);
                }
            }
            var response = {
                success: 0,
                msg: "You can't follow this user",
            };
            return res.status(400).json(response);
        } catch (e) {
            var response = {
                success: 0,
                msg: "Server error",
                error: e.message,
            };
            return res.status(500).json(response);
        }
    },
    unFollowUser: async function (req, res) {
        try {
            if (req.params.userId === req.user.userId) {
                return res
                    .status(400)
                    .json({ success: 0, msg: "You can't unfollow yourself" });
            }
            var currentUser = await UserServices.getUserData({
                userId: req.params.userId,
            });
            if (currentUser.length > 0) {
                user = currentUser[0];
                if (user.followers.include(req.user.userId)) {
                    await UserServices.updateUserDetails(
                        { userId: req.params.userId },
                        { $pull: { followers: req.user.userId } }
                    );
                    await UserServices.updateUserDetails(
                        { userId: req.user.userId },
                        { $pull: { followings: req.params.userId } }
                    );

                    var response = { success: 1, msg: "user has been unfollowed" };
                    return res.status(200).json(response);
                } else {
                    var response = {
                        success: 1,
                        msg: "You can't unfollow, first follow this user",
                    };
                    return res.status(400).json(response);
                }
            }
            var response = {
                success: 0,
                msg: "You can't unfollow this user",
            };
            return res.status(400).json(response);
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
