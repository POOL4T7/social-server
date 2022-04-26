const router = require('express').Router();
const UserController = require('../controllers/UserController');
const UserMiddleware = require('../middlewares/UserMiddleware');

router
  .route('/ownprofile')
  .get(UserMiddleware.protect, UserController.getOwnProfile)
  .patch(UserMiddleware.protect, UserController.updateOwnProfile);

router.route('/list').get(UserController.getUsersList);

router
  .route('/followings')
  .get(UserMiddleware.protect, UserController.getUserFollowings);
router
  .route('/:userId/follow')
  .patch(UserMiddleware.protect, UserController.followUser);
router
  .route('/:userId/unfollow')
  .patch(UserMiddleware.protect, UserController.unFollowUser);
router
  .route('/:userId/like')
  .patch(UserMiddleware.protect, UserController.addLike);
router
  .route('/:userId/dislike')
  .patch(UserMiddleware.protect, UserController.removeLike);

module.exports = router;
