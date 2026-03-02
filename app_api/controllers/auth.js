const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const JWT_EXPIRES_IN = "2h";

function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

const register = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: "email and password required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "user already exists" });

    const user = new User({ email, passwordHash: "temp" });
    await user.setPassword(password);
    await user.save();

    return res.status(201).json({ message: "registered" });
  } catch (e) {
    return res.status(500).json({ message: "server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: "email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "invalid credentials" });

    const ok = await user.validatePassword(password);
    if (!ok) return res.status(401).json({ message: "invalid credentials" });

    const token = signToken(user);
    return res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json({ message: "server error" });
  }
};

module.exports = { register, login };