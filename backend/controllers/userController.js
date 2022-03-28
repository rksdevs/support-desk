const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

//@desc Register a new user
//@route /api/users
//@access Public
const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Validation: Check if all fields are available
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please include all fields" });
    }

    //If user already exists

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists, please login instead" });
    }

    //Hash Password

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //Create User

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        info: "User Registered",
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }

    // console.log(name, email, password);

    // res.send("Register User");
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
  }
};

//@desc Login an existing user
//@route /api/users/login
//@access Public
const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    //Check user and match password
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        info: "Login successful",
        _id: user._id,
        email: user.email,
        name: user.name,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // res.send("Login User");
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
  }
};

//@desc Get Me - protected route for logged in users
//@route /api/users/me
//@access Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId); //userId is from authMiddleware line 15
    const copiedUser = {
      name: user.name,
      id: user._id,
      email: user.email,
    };
    res.status(200).json({ info: copiedUser });
  } catch (error) {
    return res.status(500).json({ error: [{ msg: "Internal Server Error" }] });
  }
};

// Generate Token

const generateToken = (id) => {
  return jwt.sign({ id }, keys.jwtSecret, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, getMe };
