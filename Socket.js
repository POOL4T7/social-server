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
    console.log('users after new user added: ', users);
  };

  const removeUser = () => {
    remove(socket.id);
    io.emit('getUsers', users);
    // console.log(`users ${users} remove of socketId: ${socket.id}`);
  };

  const sendMessage = ({ senderId, receiverId, text }) => {
    const user = get(receiverId);
    io.to(user.socketId).emit('getMessage', { senderId, text });
  };

  socket.on('addUser', addUser);
  socket.on('disconnect', removeUser);
  socket.on('sendMessage', sendMessage);
};

module.exports = Socket;
