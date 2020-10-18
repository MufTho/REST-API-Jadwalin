import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

import router from "./router.js";

const app = express();

// Connect to DB
mongoose.connect(
  "mongodb+srv://admin:admin@dts.hlf6j.mongodb.net/jadwalin?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connect To Database Success");
  }
);

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

app.listen("3000", () => {
  console.log("Listen port on 3000");
});
