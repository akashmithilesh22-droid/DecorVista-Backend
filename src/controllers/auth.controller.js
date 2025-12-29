import bcrypt from "bcrypt";
import User from "../models/User.js";
import Session from "../models/Session.js";

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const phoneRegex = /^[0-9]{10}$/;
const strongPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

/* ================= SIGN UP ================= */
export const signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!gmailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Gmail address" });
    }

    if (!phoneRegex.test(phone)) {
      return res
        .status(400)
        .json({ message: "Phone must be 10 digits" });
    }

    if (!strongPassword.test(password)) {
      return res.status(400).json({
        message:
          "Password must be 8+ chars, include uppercase, lowercase, number & symbol",
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashed,
    });

    res.status(201).json({
      message: "Signup successful",
      user: { id: user._id, name, email },
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed" });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!gmailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const session = await Session.create({
      name: user.name,
      email: user.email,
    });

    res.json({
      message: "Login successful",
      user: { name: user.name, email: user.email },
      sessionId: session._id,
    });
  } catch {
    res.status(500).json({ message: "Login failed" });
  }
};
