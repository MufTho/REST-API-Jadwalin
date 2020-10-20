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

// @desc Get All HomeWork
// @router Get /Api/Homeworks
router.get("/homeworks", async (req, res) => {
  const homeworks = await Homework.find({});

  if (homeworks) {
    res.json(homeworks);
  } else {
    res.status(404).json({
      message: "HomeWorks Not Found",
    });
  }
});

export default router;
