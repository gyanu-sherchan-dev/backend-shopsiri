import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import UserSchema from "../models/user/UserSchema.js";
import userModel from "../models/user/UserSchema.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    //validation
    const { name, email, password } = req.body;
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "Email is required" });
    }
    if (!password) {
      return res.send({ error: "Password is required" });
    }

    //check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        status: "success",
        message: "Already register please login",
      });
    }
    //register user
    const hassedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hassedPassword,
    }).save();
    res.status(201).send({
      status: "success",
      message: "User register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: "Error in Registration",
      error,
    });
  }
};

//POST LOGIN

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(404).send({
        sucess: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        messsage: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        messsage: "Invalid Password",
      });
    }

    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in login",
      error,
    });
  }
};

//test controller

export const testController = (req, res) => {
  res.send("Protected route");
};
