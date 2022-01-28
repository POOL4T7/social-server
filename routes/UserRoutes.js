"use strict";
const router = require("express").Router();
const UserController = require("../controllers/UserController");
const UserMiddleware = require("../middlewares/UserMiddleware");

router
    .route("/ownprofile")
    .get(UserMiddleware.protect, UserController.getOwnProfile)
    .patch(UserMiddleware.protect, UserController.updateOwnProfile);

router.route("/list").get(UserController.getUsersList);


router.route("/:userId/follow").patch(UserMiddleware.protect, UserController.followUser);
router.route("/:userId/unfollow").patch(UserMiddleware.protect, UserController.unFollowUser);

module.exports = router;
