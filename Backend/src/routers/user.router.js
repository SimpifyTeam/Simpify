import { Router } from "express";
import { registerUser, loginUser, authCallback } from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route('/callback').get(authCallback);

export default userRouter;