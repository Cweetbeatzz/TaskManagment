// models/Task.js

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User Id is Required"],
  },
  title: { type: String, required: [true, "title is Required"] },
  description: { type: String, required: [true, "description is Required"] },
});

module.exports = mongoose.model("Task", taskSchema);
