const AuthServices = require('../services/AuthServices');
const UserServices = require('../services/UserServices');

const UserMiddleware = {
  async protect(req, res, next) {
    try {
      const loginToken = req.headers['login-token'];
      if (loginToken === null || loginToken === undefined || !loginToken) {
        const response = {
          success: 0,
          message: 'loginToken Not Found',
        };
        return res.status(404).json(response);
      }
      const userData = await AuthServices.VerifyToken(loginToken);
      if (userData?.success === 1 && userData.userId !== 'NA') {
        const { userId } = userData;
        const filter = { userId };
        const userDetails = await UserServices.getUserData(filter);
        if (userDetails.length > 0) {
          const user = userDetails[0];
          delete user.password;
          req.user = user;
          next();
        } else {
          const response = {
            success: 0,
            message: 'something went wrong',
          };
          return res.status(404).json(response);
        }
      } else {
        const response = {
          success: 0,
          message: 'Invalid token',
        };
        return res.status(400).json(response);
      }
    } catch (e) {
      const response = {
        success: 0,
        msg: 'server error',
        error: e.message,
      };
      return res.status(500).json(response);
    }
  },
};

module.exports = UserMiddleware;
