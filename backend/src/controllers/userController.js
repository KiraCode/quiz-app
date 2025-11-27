const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");

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

module.exports = {register}