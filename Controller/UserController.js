// routes/users.js

const express = require("express");
const UserRouter = express.Router();
const { ensureLoggedIn } = require("../Middleware/LoggedInAuthorization");
const User = require("../Model/User");
const { hashPassword } = require("../helpers/passwordHash");

// @route   POST api/users/register
// @desc    Register a new user
//#############################################################

UserRouter.post("/register", async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Encrypt password
    const hashedpass = hashPassword(password);

    const user = new User({
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: hashedpass,
    });

    await user.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/users/
// @desc    Get current user
//#############################################################

UserRouter.get("/", ensureLoggedIn, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/users/:id
// @desc    Get current user
//#############################################################

UserRouter.get("/:id", ensureLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/users/
// @desc    Update current user
//#############################################################

UserRouter.put("/:id", ensureLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, username, email } = req.body;

  try {
    let user = await User.findById(id);

    let oldDetails = {
      firstname:
        firstname == null || firstname == undefined || firstname == ""
          ? user.firstname
          : firstname,
      lastname:
        lastname == null || lastname == undefined || lastname == ""
          ? user.lastname
          : lastname,
      username:
        username == null || username == undefined || username == ""
          ? user.username
          : username,
      email:
        email == null || email == undefined || email == "" ? user.email : email,
    };

    const output = await User.findByIdAndUpdate(id, {
      $set: oldDetails,
    });

    res.json(output);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/users/
// @desc    Delete current user
//#############################################################

UserRouter.delete("/:id", ensureLoggedIn, async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//#############################################################

module.exports = UserRouter;
