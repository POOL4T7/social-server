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
      const { _id } = req.user;
      const filter = {
        $or: [
          { senderId: _id, receiverId: req.params.id },
          { receiverId: _id, senderId: req.params.id },
        ],
      };
      const data = await MessageServices.getMessageData(filter);
      if (data.length > 0) {
        const response = {
          success: 0,
          msg: 'Uses Messages',
          data,
        };
        return res.status(200).json(response);
      }
      const response = {
        success: 0,
        msg: 'Chat Not Found',
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
};

module.exports = MessageController;
