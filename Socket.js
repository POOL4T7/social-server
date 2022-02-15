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
    const addUser = ({ userId }) => {
        add(userId, socket.id);
        io.emit("getUsers", users);
        console.log(`users after new user added: `, users);
    };

    const removeUser = () => {
        remove(socket.id);
        io.emit("getUsers", users);
        // console.log(`users ${users} remove of socketId: ${socket.id}`);
    };

    const sendMessage = ({ senderId, receiverId, text }) => {
        var user = get(receiverId);
        // console.log(`user ${user.userId} with socketId ${user.socketId} which receive the message; ${text}`);
        io.to(user.socketId).emit("getMessage", { senderId, text });
    };

    socket.on("addUser", addUser);
    socket.on("disconnect", removeUser);
    socket.on("sendMessage", sendMessage);
};

module.exports = Socket;
