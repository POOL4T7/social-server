const router = require('express').Router();
const UserMiddleware = require('../middlewares/UserMiddleware');
const ChatController = require('../controllers/ChatController');

router
  .route('/')
  .post(UserMiddleware.protect, ChatController.createChat)
  .get(UserMiddleware.protect, ChatController.getChat);

router
  .route('/:userId')
  .get(UserMiddleware.protect, ChatController.getConBtwTwoUser);

module.exports = router;
