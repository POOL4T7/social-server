const MessageServices = require('../services/MessageServices');

const MessageController = {
  async sendMessage(req, res) {
    try {
      const chatData = {
        senderId: req.user.userId,
        receiverId: req.user.userId,
        text: req.body.text,
      };
      const data = await MessageServices.addMessage(chatData);
      if (data) {
        const response = {
          success: 1,
          msg: 'Chat Added',
          data,
        };
        return res.status(200).json(response);
      }
      const response = {
        success: 0,
        msg: 'Something went wrong',
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
  async getMessages(req, res) {
    try {
      const { userId } = req.user;
      const filter = {
        $or: [
          { senderId: userId, receiverId: req.params.userId },
          { receiverId: userId, senderId: req.params.userId },
        ],
      };
      const data = await MessageServices.getMessageData(filter);
      const response = {
        success: 0,
        msg: 'Uses Messages',
        data,
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

module.exports = MessageController;
