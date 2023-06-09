import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";

//router

const router = express.Router();

//routing
//Register || Method POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

export default router;
