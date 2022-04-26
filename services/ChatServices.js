const ChatModel = require('../models/ChatModel');

const UserServices = {
  async getChatData(
    filter = {},
    select = [],
    sort = { _id: -1 },
    skip = 0,
    limit = 1,
  ) {
    let data = [];

    try {
      data = await ChatModel.find(filter)
        .select(select)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();
    } catch (e) {
      console.log(e);
    }
    return data;
  },
  async addChat(chatData) {
    let data;
    try {
      const chatObject = new ChatModel(chatData);
      data = await chatObject.save();
    } catch (e) {
      console.log(e);
    }
    return data;
  },
  async deleteChat(filter) {
    try {
      const data = await ChatModel.deleteOne(filter);
      console.log('deleted data: ', data);
    } catch (e) {
      console.log(e.message);
    }
  },
};

module.exports = UserServices;
