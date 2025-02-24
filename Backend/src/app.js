import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

const allowedOrigins = [
  "https://simpify-ai.vercel.app",
  "http://localhost:5173", 
  "*",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// import routers
import userRouter from "./routers/user.router.js"
import baseRouter from "./routers/router.js"

// declaring routers
app.use("/api/v1/users", userRouter);
app.use("", baseRouter);

export { app }