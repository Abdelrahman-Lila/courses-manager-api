import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import "dotenv/config";
import generateJWT from "../utils/generate-JWT.js";

const getAllUsers = async (req, res) => {
  let users = await User.find();
  res.json(users);
};

const register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
    role: role,
    avatar: req.file.filename,
  });
  const token = generateJWT(
    { email: user.email, id: user._id, role: user.role },
    "10m",
  );

  await user.save();
  res.json({ user, token: token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const emailValidation = validator.isEmail(email);

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = generateJWT(
    { email: user.email, id: user._id, role: user.role },
    "10m",
  );
  return res
    .status(200)
    .json({ message: "Logged in successfully", token: token });
};

export { getAllUsers, register, login };
