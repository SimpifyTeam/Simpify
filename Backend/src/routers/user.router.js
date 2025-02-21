import { Router } from "express";
import { registerUser, loginUser, authCallback } from "../controllers/users.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route('/callback').get(authCallback);

export default router;