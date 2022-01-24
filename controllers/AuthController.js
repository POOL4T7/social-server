"use strict";
const AuthServices = require("../services/AuthServices");
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
            var formData = {
                email: req.body.email,
                password: await AuthServices.generatePassword(req.body.password),
                profileDetails: {
                    name: req.body.name,
                    gender: req.body.gender,
                    username: await AuthServices.generateUsername()
                }
            }
            var user = await UserServices.addUser(formData);
            var token = await AuthServices.generateToken({
                _id: user._id,
                key: user.key,
            });
            user.password = undefined;
            var response = {
                success: 1,
                msg: "Registration successfully",
                data: { user: user, token: token },
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
    login: async function (req, res) {
        try {
            let existUser = await UserServices.getUserData({ email: req.body.email });
            if (existUser.length == 0) {
                var response = {
                    success: 0,
                    msg: "User is not registred",
                };
                return res.status(400).json(response);
            }
            var user = existUser[0];
            let isMatched = await AuthServices.verifyPassword(
                req.body.password,
                user.password
            );
            if (!isMatched) {
                var response = {
                    success: 0,
                    msg: "Wrong Credentials",
                };
                return res.status(400).json(response);
            }
            delete user.password;
            var token = await AuthServices.generateToken({
                _id: user._id,
                key: user.key,
            });
            var response = {
                success: 1,
                msg: "Login Success",
                data: { user: user, token: token },
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
};

module.exports = AuthController;
