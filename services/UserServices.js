const UUID = require('uuid');
const UserModel = require('../models/UserModel');

const UserServices = {
  async getUserData(
    filter = {},
    select = [],
    sort = { _id: -1 },
    skip = 0,
    limit = 1,
  ) {
    let data = [];

    try {
      data = await UserModel.find(filter)
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
  async addUser(userData) {
    let data;
    try {
      const formData = userData;
      const userId = await UUID.v4();
      formData.userId = userId.toString();

      const userObject = new UserModel(formData);
      data = await userObject.save();
    } catch (e) {
      console.log(e);
      throw Error(e.message);
    }
    return data;
  },
  async updateUserDetails(filter, updateData) {
    let data = {};
    try {
      data = await UserModel.findOneAndUpdate(filter, updateData, {
        multi: false,
        new: true,
      });
      return data;
    } catch (e) {
      console.log(e);
      throw Error(e.message);
    }
  },
};

module.exports = UserServices;
