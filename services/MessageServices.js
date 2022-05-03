const MessageModel = require('../models/MessageModel');

const UserServices = {
  async getMessageData(
    filter = {},
    select = [],
    sort = {},
    skip = 0,
    limit = {},
  ) {
    let data = [];

    try {
      data = await MessageModel.find(filter)
        .select(select)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();
    } catch (e) {
      console.log(e);
      throw Error(e.message);
    }
    return data;
  },
  async addMessage(chatData) {
    let data = {};
    try {
      const messageObject = new MessageModel(chatData);
      data = await messageObject.save();
    } catch (e) {
      console.log(e);
      throw Error(e.message);
    }
    return data;
  },
};

module.exports = UserServices;
