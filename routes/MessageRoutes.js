const router = require('express').Router();
const UserMiddleware = require('../middlewares/UserMiddleware');
const MessageController = require('../controllers/MessageController');

router
  .route('/:userId')
  .get(UserMiddleware.protect, MessageController.getMessages);

module.exports = router;
