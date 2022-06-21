const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const Socket = require('./Socket');
const mongodb = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://encychat.herokuapp.com'
        : 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

/**
 * @description import routes
 */
const AuthRoutes = require('./routes/AuthRoutes');
const UserRoutes = require('./routes/UserRoutes');
// const ChatRoutes = require('./routes/ChatRoutes');
const MessageRoutes = require('./routes/MessageRoutes');

mongodb();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
  }),
);

app.get('/', (req, res) => {
  const response = {
    success: 1,
    message: 'Welcome to new era of Chating',
  };
  res.status(200).json(response);
});

app.use('/api/auth', AuthRoutes);
app.use('/api/user', UserRoutes);
// app.use('/api/chat', ChatRoutes);
app.use('/api/message', MessageRoutes);

/**
 * @description Page NOT FOUND Error
 */
app.use((req, res) => {
  const response = {
    success: 0,
    message: `NOT FOUND ${req.originalUrl}`,
  };
  return res.status(404).json(response);
});

io.on('connection', (socket) => {
  Socket(io, socket);
});

const { PORT, NODE_ENV } = process.env;

httpServer.listen(PORT, () => {
  console.log(`Server is running on ${PORT} in ${NODE_ENV}`);
});
