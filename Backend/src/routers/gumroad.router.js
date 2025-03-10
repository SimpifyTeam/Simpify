import { Router } from "express";
import { webhookHandler } from "../controllers/gumroad.controller";

const gumroadRouter = Router();

gumroadRouter.route("/webhook").post(webhookHandler);

export default gumroadRouter;
