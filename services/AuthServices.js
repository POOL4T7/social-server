"use strict";

const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
    generatePassword: async function (password) {
        let hashPassword = "NA";
        try {
            const salt = await bcrypt.genSalt(10);
            hashPassword = await bcrypt.hash(password, salt);
        } catch (e) {
            console.log(e.message);
        }
        return hashPassword;
    },
    verifyPassword: async function (password, hashPassword) {
        let data = false;
        try {
            data = await bcrypt.compare(password, hashPassword);
        } catch (e) {
            console.log(e.message);
        }
        return data;
    },
    generateUsername: async function () {
        var username = "";
        try {
            username = await Math.random().toString(36).substring(2, 7).toUpperCase()

        } catch (e) {
            console.log(e.message);
        }
        return username
    }
};

module.exports = AuthServices;
