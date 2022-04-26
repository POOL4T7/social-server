const MessageServices = require('../services/MessageServices');
const ChatServices = require('../services/ChatServices');

const MessageController = {
  async sendMessage(req, res) {
    try {
      const filter = {
        members: { $all: [req.user.userId, req.params.userId] },
      };
      const chats = await ChatServices.getChatData(filter);
      if (chats.length > 0) {
        const chat = chats[0];
        const { _id } = chat;
        const chatData = {
          senderId: req.user.userId,
          text: req.body.text,
          chatId: _id,
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
      }
      const response = {
        success: 0,
        msg: 'you have to follow him first',
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
      let filter = {
        members: { $all: [req.user.userId, req.params.userId] },
      };
      const chats = await ChatServices.getChatData(filter);
      if (chats.length > 0) {
        const chat = chats[0];
        const { _id } = chat;
        filter = {
          chatId: _id,
        };
        const data = await MessageServices.getMessageData(filter);
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
