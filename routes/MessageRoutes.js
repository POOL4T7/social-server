"use strict";
const router = require("express").Router();
const UserMiddleware = require("../middlewares/UserMiddleware");
const MessageController = require("../controllers/MessageController");

router
    .route("/:userId")
    .get(UserMiddleware.protect, MessageController.getMessages)
    .post(UserMiddleware.protect, MessageController.sendMessage);

module.exports = router;
