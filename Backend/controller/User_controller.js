import UserModel from "../models/User_Model.js";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";

// creating jsonwebtoken
const JWTtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

// for user login
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.json({ msg: "User doesn't exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = JWTtoken(user._id);
      res.json({ success: true, token, msg: "User logged in successfully." });
    } else {
      res.json({ success: false, msg: "invalid credentials." });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// for user Register
const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checking if user already exist
    const exist = await UserModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User already exist" });
    }

    // validating the email and password
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter Strong password" });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const HashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      email,
      password: HashedPassword,
    });
    const user = await newUser.save();

    const token = JWTtoken(user._id);
    res.json({ success: true, token, msg: "User Registered successfully." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// for AdminLogin login
const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET_KEY);
      res.json({ success: true, msg:"admin logged in successfully", token });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: error });
  }
};

export { Login, Register, AdminLogin };
