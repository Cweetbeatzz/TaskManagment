// models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: [true, "Firstname is Required"] },
  lastname: { type: String, required: [true, "Lastname is Required"] },
  username: { type: String, required: [true, "Username is Required"] },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: { type: String, required: [true, "Password is Required"] },
});

module.exports = mongoose.model("User", userSchema);
