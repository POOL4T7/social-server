const UserServices = require('../services/UserServices');
const ChatServices = require('../services/ChatServices');

const UserController = {
  async getOwnProfile(req, res) {
    try {
      const { user } = req;
      return res.send(user);
    } catch (e) {
      const response = {
        success: 0,
        msg: 'Server error',
        error: e.message,
      };
      return res.status(500).json(response);
    }
  },
  async updateOwnProfile(req, res) {
    try {
      const filter = {
        _id: req.body.id,
        userId: req.user.userId,
      };
      const profile = req.user.profileDetails;
      const formData = {
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
      const data = await UserServices.updateUserDetails(filter, formData);
      let response = {};
      if (data) {
        response = {
          success: 1,
          msg: 'Profile updated',
          data,
        };
        return res.status(200).json(response);
      }
      response = {
        success: 0,
        msg: 'Something went wrong',
      };
      return res.status(404).json(response);
    } catch (e) {
      const response = {
        success: 0,
        msg: 'Server error',
        error: e.message,
      };
      return res.status(500).json(response);
    }
  },
  async getUsersList(req, res) {
    try {
      const users = await UserServices.getUserData(
        {},
        ['-password'],
        { _id: -1 },
        0,
        30,
      );
      const response = {
        success: 1,
        msg: 'Users List',
        data: users,
      };
      return res.status(200).json(response);
    } catch (e) {
      const response = {
        success: 0,
        msg: 'Server error',
        error: e.message,
      };
      return res.status(500).json(response);
    }
  },
  async followUser(req, res) {
    try {
      if (req.params.userId === req.user.userId) {
        return res
          .status(400)
          .json({ success: 0, msg: "You can't follow yourself" });
      }
      const currentUser = await UserServices.getUserData({
        userId: req.params.userId,
      });
      if (currentUser.length > 0) {
        const user = currentUser[0];
        if (!user.followers.includes(req.user.userId)) {
          await UserServices.updateUserDetails(
            { userId: req.params.userId },
            { $push: { followers: req.user.userId } },
          );
          await UserServices.updateUserDetails(
            { userId: req.user.userId },
            { $push: { followings: req.params.userId } },
          );
          await ChatServices.addChat({
            members: [req.user.userId, req.params.userId],
          });
          const response = {
            success: 1,
            msg: 'user has been followed',
          };
          return res.status(200).json(response);
        }
        const response = {
          success: 1,
          msg: 'You already follow this user',
        };
        return res.status(400).json(response);
      }
      const response = {
        success: 0,
        msg: "You can't follow this user",
      };
      return res.status(400).json(response);
    } catch (e) {
      const response = {
        success: 0,
        msg: 'Server error',
        error: e.message,
      };
      return res.status(500).json(response);
    }
  },
  async unFollowUser(req, res) {
    try {
      if (req.params.userId === req.user.userId) {
        return res
          .status(400)
          .json({ success: 0, msg: "You can't unfollow yourself" });
      }
      const currentUser = await UserServices.getUserData({
        userId: req.params.userId,
      });
      if (currentUser.length > 0) {
        const user = currentUser[0];
        if (user.followers.includes(req.user.userId)) {
          await UserServices.updateUserDetails(
            { userId: req.params.userId },
            { $pull: { followers: req.user.userId } },
          );
          await UserServices.updateUserDetails(
            { userId: req.user.userId },
            { $pull: { followings: req.params.userId } },
          );
          await ChatServices.deleteChat({
            members: [req.user.userId, req.params.userId],
          });
          const response = {
            success: 1,
            msg: 'user has been unfollowed',
          };
          return res.status(200).json(response);
        }
        const response = {
          success: 1,
          msg: "You can't unfollow, first follow this user",
        };
        return res.status(400).json(response);
      }
      const response = {
        success: 0,
        msg: "You can't unfollow this user",
      };
      return res.status(400).json(response);
    } catch (e) {
      const response = {
        success: 0,
        msg: 'Server error',
        error: e.message,
      };
      return res.status(500).json(response);
    }
  },
  async addLike(req, res) {
    try {
      if (req.params.userId === req.user.userId) {
        return res
          .status(400)
          .json({ success: 0, msg: "You can't like your profile" });
      }
      const currentUser = await UserServices.getUserData({
        userId: req.params.userId,
      });
      if (currentUser.length > 0) {
        const user = currentUser[0];
        if (!user.likes.includes(req.user.userId)) {
          const data = await UserServices.updateUserDetails(
            { userId: req.params.userId },
            { $push: { likes: req.user.userId } },
          );
          if (data) {
            const response = {
              success: 1,
              msg: 'user profile has been liked',
            };
            return res.status(200).json(response);
          }
          const response = {
            success: 1,
            msg: 'Something went wrong',
          };
          return res.status(404).json(response);
        }
        const response = {
          success: 1,
          msg: "You can't like this user profile",
        };
        return res.status(400).json(response);
      }
      const response = {
        success: 0,
        msg: "You can't like this user profile",
      };
      return res.status(400).json(response);
    } catch (e) {
      const response = {
        success: 0,
        msg: 'Server error',
        error: e.message,
      };
      return res.status(500).json(response);
    }
  },
  async removeLike(req, res) {
    try {
      if (req.params.userId === req.user.userId) {
        return res
          .status(400)
          .json({ success: 0, msg: "You can't like your profile" });
      }
      const currentUser = await UserServices.getUserData({
        userId: req.params.userId,
      });
      if (currentUser.length > 0) {
        const user = currentUser[0];
        if (user.likes.includes(req.user.userId)) {
          const data = await UserServices.updateUserDetails(
            { userId: req.params.userId },
            { $pull: { likes: req.user.userId } },
          );
          if (data) {
            const response = {
              success: 1,
              msg: 'user profile has been disliked',
            };
            return res.status(200).json(response);
          }
          const response = {
            success: 1,
            msg: 'Something went wrong',
          };
          return res.status(200).json(response);
        }
        const response = {
          success: 1,
          msg: "You can't dislike this user profile",
        };
        return res.status(400).json(response);
      }
      const response = {
        success: 0,
        msg: "You can't dislike this user profile",
      };
      return res.status(400).json(response);
    } catch (e) {
      const response = {
        success: 0,
        msg: 'Server error',
        error: e.message,
      };
      return res.status(500).json(response);
    }
  },
  async getUserFollowings(req, res) {
    try {
      const { followings } = req.user;
      const friends = await Promise.all(
        followings.map(async (friendId) => {
          const userDetails = await UserServices.getUserData(
            { userId: friendId },
            ['-password'],
          );
          if (userDetails.length > 0) {
            const user = await userDetails[0];
            return user;
          }
        }),
      );
      const response = {
        success: 1,
        data: friends,
        msg: 'List of friend',
      };
      return res.status(200).json(response);
    } catch (e) {
      const response = {
        success: 0,
        msg: 'Server error',
        error: e.message,
      };
      return res.status(500).json(response);
    }
  },
};

module.exports = UserController;
