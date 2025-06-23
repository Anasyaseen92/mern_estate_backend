import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";

dotenv.config();

const app = express();

// ✅ Define `app` before using it
app.use(cors({
  origin: ['https://mern-estate-fronten.netlify.app/', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log("MongoDB connection error:", err.message);
  });

// ✅ Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.get('/', (req, res) => {
  res.send({ activeStatus: true, error: false });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// ❌ DO NOT USE app.listen() on Vercel
export default app;
