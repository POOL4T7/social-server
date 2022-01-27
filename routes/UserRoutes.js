"use strict";
const router = require("express").Router();
const UserController = require("../controllers/UserController");
const UserMiddleware = require("../middlewares/UserMiddleware");

router
    .route("/ownprofile")
    .get(UserMiddleware.protect, UserController.getOwnProfile)
    .patch(UserMiddleware.protect, UserController.updateOwnProfile);

router.route("/profile/:id").get();

router.route("/:id/follow").patch();
router.route("/:id/unfollow").patch();

module.exports = router;
