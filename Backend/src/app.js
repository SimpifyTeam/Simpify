import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// import routers
import userRouter from "./routers/user.router.js"
import baseRouter from "./routers/router.js"

// declaring routers
app.use("api/v1/users", userRouter);
app.use("", baseRouter);

export { app }