const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, password is required to register",
      });
    }

    // check if the user exists or nit
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Uer already exists" });
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error in registering User");
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password required to login" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: `No user exists with ${email} email id` });
    }

    // check for the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // generate jwt token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "300m" }
    );

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error logging in", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const quizAttempts = async (req, res) => {
  try {
    const userId = req.user._id;
    const attempts = await User.findById(userId).populate("quiz_attempts");
    
    res.status(200).json({ attempts: attempts.quiz_attempts });
  } catch (error) {
    console.error("Error fetching quiz attempts", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = { register, login, quizAttempts };
