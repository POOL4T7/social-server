"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
const mongodb = require("./config/db");
const { Server } = require("socket.io");
const { createServer } = require("http");
const Socket = require("./Socket");
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
/**
 * @description import routes
 */
const AuthRoutes = require("./routes/AuthRoutes");
const UserRoutes = require("./routes/UserRoutes");

mongodb();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "50mb",
    })
);

app.get("/", (req, res) => {
    var response = {
        success: 1,
        message: "Welcome to new era of Collections",
    };
    res.status(200).json(response);
});

app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);

/**
 * @description Page NOT FOUND Error
 */
app.use((req, res) => {
    return res.status(404).json({
        success: 0,
        message: `NOT FOUND ${req.originalUrl}`,
    });
});

io.on("connection", (socket) => {
    Socket(io, socket);
});

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV;

httpServer.listen(PORT, () => {
    console.log(`Server is running on ${PORT} in ${NODE_ENV}`);
});
