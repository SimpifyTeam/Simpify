import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";

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

// Middleware to store raw body while allowing JSON parsing
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString(); // Store raw body separately
    },
  })
);

// Middleware to store session data
app.use(session({
  secret: process.env.SESSION_SECRET, // Use a strong secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === "production" }, // Secure cookies in production
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import routers
import userRouter from "./routers/user.router.js";
import baseRouter from "./routers/router.js";
import gumroadRouter from "./routers/gumroad.router.js";

// declaring routers
app.use("/api/v1/users", userRouter);
app.use("", baseRouter);
app.use("/api/v1/gumroad", gumroadRouter);

export { app };
