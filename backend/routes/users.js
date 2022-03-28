const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

//Register user

router.post("/", registerUser);

//Login user

router.post("/login", loginUser);

//protected route for logged in users

router.get("/me", authMiddleware, getMe);

module.exports = router;
