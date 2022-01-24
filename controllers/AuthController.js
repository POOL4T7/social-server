"use strict";
const AuthServices = require("../services/AuthServices");
const ProfileServices = require("../services/ProfileServices");
const UserServices = require("../services/UserServices");

var AuthController = {
    register: async function (req, res) {
        try {
            let existUser = await UserServices.getUserData({ email: req.body.email });
            if (existUser.length > 0) {
                var response = {
                    success: 0,
                    msg: "User already registred",
                };
                return res.status(400).json(response);
            }
            var user = await UserServices.addUser({
                email: req.body.email,
                password: await AuthServices.generatePassword(req.body.password),
            });
            var profile = await ProfileServices.addProfile({
                userId: user._id,
                username: req.body.name,
                gender: req.body.gender,
            });
            delete user.password;
            var response = {
                success: 1,
                msg: "Registration successfully",
                data: [user, profile],
            };
            return res.status(201).json(response);
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
