let users = [];

const add = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId: userId, socketId: socketId });
};

const remove = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const get = (userId) => {
    return users.find((user) => user.userId === userId);
};

var Socket = (io, socket) => {
    const addUser = ({ userId, socketId }) => {
        add(userId, socketId);
        io.emit("getUsers", users);
    };

    const removeUser = (socketId) => {
        remove(socketId);
        io.emit("getUsers", users);
    };
    const sendMessage = ({ senderId, receiverId, text }) => {
        var user = get(receiverId);
        io.to(user.socketId).emit("getMessage", { senderId, text });
    };

    socket.on("addUser", addUser);
    socket.on("disconnect", removeUser);
    socket.on("sendMessage", sendMessage);
};

module.exports = Socket;
