// routes/tasks.js

const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require("../Middleware/LoggedInAuthorization");
const Task = require("../Model/Task");
const User = require("../Model/User");
const Joi = require("joi");

const taskSchema = Joi.object({
  userId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const TaskRouter = (io) => {
  //#############################################################

  // @route   GET api/tasks
  // @desc    Get all tasks

  router.get("/", ensureLoggedIn, async (req, res) => {
    try {
      const tasks = await Task.find({});
      res.json(tasks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  //#############################################################

  // @route   GET api/tasks/3
  // @desc    Get tasks by id

  router.get("/:id", ensureLoggedIn, async (req, res) => {
    try {
      const tasks = await Task.findById({ _id: req.params.id });
      res.json(tasks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  //#############################################################

  // @route   POST api/tasks
  // @desc    Create a task

  router.post("/", ensureLoggedIn, async (req, res) => {
    const { error } = taskSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    const { userId, title, description } = req.body;

    try {
      const newTask = new Task({
        userId: userId,
        title: title,
        description: description,
      });

      const task = await newTask.save();
      // Emit event for task creation
      io.emit("taskCreated", task);

      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  //#############################################################

  // @route   PUT api/tasks/:id
  // @desc    Update a task

  router.put("/:id", ensureLoggedIn, async (req, res) => {
    const { userId, title, description } = req.body;
    const { id } = req.params;

    // Build task object
    const updatingTasks = {};
    if (title) updatingTasks.title = title;
    if (description) updatingTasks.description = description;

    try {
      let task = await Task.findById(id);

      if (!task) return res.status(404).json({ msg: "Task not found" });

      // Making sure user owns task
      if (task.userId.toString() !== userId) {
        return res.status(401).json({ msg: "Not authorized" });
      }

      task = await Task.findByIdAndUpdate(
        id,
        { $set: updatingTasks },
        { new: true }
      );

      // Emit event for task update
      io.emit("taskUpdated", task);
      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  //#############################################################

  // @route   DELETE api/tasks/:id
  // @desc    Delete a task

  router.delete("userId/:id", ensureLoggedIn, async (req, res) => {
    try {
      let task = await Task.findById(req.params.id);

      if (!task) return res.status(404).json({ msg: "Task not found" });

      // Making sure user owns task
      if (task.userId.toString() !== req.params.userId) {
        return res.status(401).json({ msg: "Not authorized" });
      }

      await Task.findByIdAndRemove(req.params.id);

      // Emit event for task deletion
      io.emit("taskDeleted", { taskId: req.params.id });
      res.json({ msg: "Task removed" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
  //#############################################################

  return router;
};

module.exports = TaskRouter;
