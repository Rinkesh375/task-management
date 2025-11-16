const UserModel = require("../models/User-Schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// If time remains, will  implement user-based task fetching and creation and google and github auth.
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req?.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const existing = await UserModel.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Registered successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await UserModel.findById(userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const updates = { ...req.body };

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
