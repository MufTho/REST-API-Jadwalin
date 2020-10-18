import express from "express";
import Homework from "./database.js";

const router = express.Router();

// @decs Create new homework
// @router POST /api/homeworks

router.post("/homeworks", async (req, res) => {
  try {
    const { course, title, due_date, status } = req.body;
    const homework = new Homework({
      course,
      title,
      due_date,
      status,
    });
    const createdHomework = await homework.save();
    res.status(201).json(createdHomework);
  } catch (err) {
    res.status(500).json({ error: "database creating failed" });
  }
});

export default router;
