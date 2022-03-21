const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Task = require("../models/task");

router.get("/", function (req, res) {
  Task.find({}, (err, users) => {
    if (err) {
      res.status(400).json({ error: "Invalid request" });
      return;
    }
    res.json({ success: true, users, noOfTasks: users.length });
  });
});

router.post("/add", (req, res) => {
  const { name } = req.body;
  const _id = mongoose.Types.ObjectId();
  Task.create({ _id, name, isDone: false }, (err, user) => {
    if (err) {
      res.status(400).json({ error: "Invalid request" });
      return;
    }
    res.status(200).json({ success: true, user });
  });
});

router.put("/update", (req, res) => {
  const { _id } = req.body;
  Task.find({ _id }, (err, user) => {
    if (err) {
      res.status(400).json({ error: "No task found" });
      return;
    }
    Task.findByIdAndUpdate(
      _id,
      { $set: { isDone: !user.isDone } },
      { new: true },
      (err, user) => {
        if (err) {
          res.status(400).json({ error: "Invalid request" });
          return;
        }
        res.status(200).json({ success: true, user });
      }
    );
  });
});

router.delete("/delete", (req, res) => {
  const { _id } = req.body;
  Task.findByIdAndDelete(_id, (err, user) => {
    if (err) {
      res.status(400).json({ error: "No task found" });
      return;
    }
    res.status(200).json({ success: true });
  });
});

module.exports = router;
