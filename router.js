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

  if (homeworks && homeworks.lenght !== 0) {
    res.json(homeworks);
  } else {
    res.status(404).json({
      message: "HomeWorks Not Found",
    });
  }
});

//  @desc Get by id homework
//  @router Get /api/homeworks/:id
router.get("/homeworks/:id", async (req, res) => {
  const homework = await Homework.findById(req.params.id);

  if (homework) {
    res.json(homework);
  } else {
    res.status(404).json({
      message: "Homework not found",
    });
  }
});

// @decs Update homework
// @router PUT /api/homeworks/:id
router.put("/homeworks/:id", async (req, res) => {
  const { course, title, due_date, status } = req.body;

  const homework = await Homework.findById(req.params.id);
  if (homework) {
    homework.course = course;
    homework.title = title;
    homework.due_date = due_date;
    homework.status = status;

    const updateHomework = await homework.save();
    res.json(updateHomework);
  } else {
    res.status(404).json({
      message: "homework not found",
    });
  }
});

// @desc Delete homework
// @router Delete /api/homeworks/:id
router.delete("/homeworks/:id", async (req, res) => {
  const homework = await Homework.findById(req.params.id);

  if (homework) {
    await homework.remove();
    res.json({
      message: "Data Remove",
    });
  } else {
    res.status(404).json({
      message: "homework not found",
    });
  }
});

// @desc Delete all homework
// @router Delete /api/homeworks/
router.delete("/homeworks", async (req, res) => {
  const homework = await Homework.deleteMany();

  if (homework) {
    res.json({
      message: "Data Remove",
    });
  } else {
    res.status(404).json({
      message: "homework not found",
    });
  }
});

export default router;
