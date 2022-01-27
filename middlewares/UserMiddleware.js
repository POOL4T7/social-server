"use strict";

const AuthServices = require("../services/AuthServices");
const UserServices = require("../services/UserServices");

var UserMiddleware = {
    protect: async function (req, res, next) {
        try {
            let loginToken = req.headers["login-token"];

            if (loginToken === null || loginToken === undefined || !loginToken)
                throw new Error("loginToken Not Found");

            var userData = await AuthServices.VerifyToken(loginToken);

            if (userData?.success == 1 && userData.userId != "NA") {
                var userId = userData.userId;
                var filter = { userId: userId };
                var userDetails = await UserServices.getUserData(filter);
                if (userDetails.length > 0) {
                    let user = userDetails[0];
                    delete user.password;
                    req.user = user;
                    next();
                } else {
                    var response = {
                        success: 0,
                        message: "something went wrong",
                    };
                    return res.send(response);
                }
            } else {
                var response = {
                    success: 0,
                    message: "Invalid token",
                };
                return res.send(response);
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

module.exports = UserMiddleware;
