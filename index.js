import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

import router from "./router.js";

const app = express();

// Connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGGODB_URI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        console.log("Connect To Database Success");
      }
    );
  } catch (err) {
    console.log(err);
  }
};

connectDB();

// Midlewares
app.use(morgan("dev"));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.json({
    message: "success",
  });
});

app.use("/api", router); // http://localhost:3000/api/

const PORT = process.env.PORT || "4000";
app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
