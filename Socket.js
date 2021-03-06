/* eslint-disable no-unused-expressions */
const MessageServices = require('./services/MessageServices');

let users = [];

const add = (userId, socketId) => {
  // eslint-disable-next-line no-unused-expressions
  !users.some((user) => user.userId === userId)
    && users.push({ userId, socketId });
};

const remove = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const get = (userId) => users.find((user) => user.userId === userId);

const Socket = (io, socket) => {
  const addUser = ({ userId }) => {
    add(userId, socket.id);
    io.emit('getUsers', users);
  };

  const removeUser = () => {
    remove(socket.id);
    io.emit('getUsers', users);
  };

  const sendMessage = async ({ senderId, receiverId, text }) => {
    const user = get(receiverId);
    try {
      const chatData = { senderId, receiverId, text };
      const data = await MessageServices.addMessage(chatData);
      if (data) {
        const response = {
          success: 1,
          msg: 'Chat Added',
          data,
        };
        user && io.to(user?.socketId).emit('getMessage', response);
        return;
      }
      const response = {
        success: 0,
        msg: 'Something went wrong',
      };
      console.log(response);
    } catch (e) {
      const response = {
        success: 0,
        msg: 'Server error',
        error: e.message,
      };
      console.log(response);
    }
  };

  socket.on('addUser', addUser);
  socket.on('disconnect', removeUser);
  socket.on('sendMessage', sendMessage);
};

module.exports = Socket;
