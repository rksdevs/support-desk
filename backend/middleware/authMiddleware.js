const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");
const User = require("../models/User");

let authMiddleware = async (req, res, next) => {
  const token = req.header("authorization");
  if (!token) {
    return res.status(403).json({ info: "Auth Denied", type: "error" });
  }
  jwt.verify(token, jwtSecret, async (error, decoded) => {
    if (error) {
      return res.status(403).json({ info: "Unauthorized", type: "error" });
    } else {
      //get user from token
      req.userId = decoded.id;
      //   req.user = await User.next();
      next();
    }
  });
};

module.exports = authMiddleware;
