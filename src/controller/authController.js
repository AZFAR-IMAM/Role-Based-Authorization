const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({username})
    if(!user){
        res.status(404).json({message:"user not found"})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({message:" Invalid credentials"})
    }
    const payload = {id:user._id, role:user.role};
    const key = process.env.JWT_SECRET;
    
    const token = jwt.sign(payload, key, {expiresIn: "1h"})
    res.status(200).json({token})
  } catch (error) {
    return res.status(500).json({ message: "Server error",error:error.message });
  }
};

module.exports = {
  register,
  login,
};
