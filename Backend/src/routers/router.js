import { Router } from "express";
import {Home} from "../controllers/controller.js";


const baseRouter = Router();
baseRouter.route("/").get(Home);

export default baseRouter;