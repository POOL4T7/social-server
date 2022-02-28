const ChatServices = require('../services/ChatServices');

const ChatController = {
  async createChat(req, res) {
    try {
      const chatData = {
        members: [req.body.senderId, req.body.receiverId],
      };
      const data = ChatServices.addChat(chatData);
      if (data) {
        const response = {
          success: 1,
          msg: 'Chat Added',
        };
        return res.status(500).json(response);
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
  async getChat(req, res) {
    try {
      const filter = {
        members: { $in: [req.user.userId] },
      };
      const data = await ChatServices.getChatData(filter);
      const response = {
        success: 0,
        msg: 'get user chat',
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
  async getConBtwTwoUser(req, res) {
    try {
      const filter = {
        members: { $all: [req.user.userId, req.params.userId] },
      };
      const data = await ChatServices.getChatData(filter);
      const response = {
        success: 0,
        msg: 'get user chat',
        data,
      };
      return res.status(200).json(response);
    } catch (e) {
      const response = {
        success: 0,
        msg: 'Something went wrong',
        error: e.message,
      };
      return res.status(500).json(response);
    }
  },
};

module.exports = ChatController;
