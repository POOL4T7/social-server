const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const AuthServices = {
  async generateToken(data) {
    let token;
    try {
      token = await JWT.sign(data, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });
    } catch (e) {
      console.log(e.message);
    }
    return token;
  },
  async VerifyToken(token) {
    let decode;
    try {
      decode = await JWT.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      console.log(e.message);
    }
    return decode;
  },
  async generatePassword(password) {
    let hashPassword = 'NA';
    try {
      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(password, salt);
    } catch (e) {
      console.log(e.message);
    }
    return hashPassword;
  },
  async verifyPassword(password, hashPassword) {
    let data = false;
    try {
      data = await bcrypt.compare(password, hashPassword);
    } catch (e) {
      console.log(e.message);
    }
    return data;
  },
  async generateUsername() {
    let username = '';
    try {
      username = await Math.random().toString(36).substring(2, 7).toUpperCase();
    } catch (e) {
      console.log(e.message);
    }
    return username;
  },
};

module.exports = AuthServices;
