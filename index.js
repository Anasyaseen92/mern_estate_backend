import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.route.js";
const cors = require('cors');
app.use(cors({
  origin: ['https://mern-estate-fronten.netlify.app', 'http://localhost:5173'], // Allow multiple origins
  credentials: true
}));
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB connection successful!");
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err);
    console.log("Error Details:", err.stack);
  });
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
app.get('/',(req,res)=>{
  res.send({
    activeStatus :true,
    error: false
  })
})
//app.listen(3000, () => {
  //console.log("Server is running on port 3000");
//});
