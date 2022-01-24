"use strict";

const JWT = require("jsonwebtoken");

var AuthServices = {
    generateToken: async function (data) {
        let token;
        try {
            token = await JWT.sign(data, process.env.JWT_SECRET, {
                expiresIn: "30d",
            });
        } catch (e) {
            console.log(e.message);
        }
        return token;
    },
    VerifyToken: async function (token) {
        let decode;
        try {
            decode = await JWT.verify(token, process.env.JWT_SECRET);
        } catch (e) {
            console.log(e.message);
        }
        return decode;
    },
    generatePassword: async function () {
        let password;
        return password
    }
};

module.exports = AuthServices;
