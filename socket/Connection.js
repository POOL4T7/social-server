const MessageServices = require('../services/MessageServices');

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
        io.to(user.socketId).emit('getMessage', response);
      }
      const response = {
        success: 0,
        msg: 'Something went wrong',
      };
      io.to(user.socketId).emit('error', response);
    } catch (e) {
      const response = {
        success: 0,
        msg: 'Server error',
        error: e.message,
      };
      io.to(user.socketId).emit('error', response);
    }
  };

  socket.on('addUser', addUser);
  socket.on('disconnect', removeUser);
  socket.on('sendMessage', sendMessage);
};

module.exports = Socket;
