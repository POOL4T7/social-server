"use strict";
const mongoose = require("mongoose");
const Common = require("./common")

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL || Common.DB.URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("mongoDB connected: ", conn.connection.host);
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

module.exports = connectDB;
