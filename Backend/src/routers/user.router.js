import { Router } from "express";
import { registerUser } from "../controllers/users.controller.js";

const router = Router();

router.route("/signup").post(registerUser);

export default router;