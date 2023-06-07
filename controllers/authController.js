import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/user/UserSchema.js";

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
