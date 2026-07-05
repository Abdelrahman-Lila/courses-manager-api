import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import validator from "validator";

const getAllUsers = async (req, res) => {
  let users = await User.find();
  res.json(users);
};

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
  });

  await newUser.save();
  res.json(newUser);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const emailValidation = validator.isEmail(email);
  if (!emailValidation) {
    res.status(404).json({ error: "Incorrect Email" });
  } else {
    if (emailValidation && password !== "") {
      const user = await User.findOne({ email: email });
      if (user) {
        const matchedPassword = await bcrypt.compare(password, user.password);
        if (matchedPassword) {
          res.status(200).json({ msg: "Logged in successfully" });
        } else {
          res.status(404).json({ error: "Incorrect Password" });
        }
      } else {
        res.status(404).json({ error: "User not found" });
      }
    }
  }
};

export { getAllUsers, register, login };
