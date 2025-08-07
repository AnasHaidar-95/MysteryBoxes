import express from "express";
import { loginUser, registerUser } from "../contrllers/authController.js";
const authRouter = express.Router();

authRouter.post('/register',registerUser);
authRouter.post('/login',loginUser);

export default authRouter;