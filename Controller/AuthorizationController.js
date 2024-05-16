const express = require("express");
const authRouter = express.Router();
require("dotenv").config();
const { comparePasswords } = require("../helpers/passwordHash");
const { generateToken } = require("../helpers/Jwt");
const User = require("../Model/User");

//#############################################################

authRouter.post("/login", async (req, res) => {
  try {
    console.log("loggining in...");

    const { email, password } = req.body;
    // console.log("email", email);
    // console.log("password", password);

    //search fr email
    const searchUserEmail = await User.findOne({ email: email });

    // compare passwords
    if (searchUserEmail) {
      // Verify a password
      if (comparePasswords(searchUserEmail.data.password, password)) {
        //send these details plus the generated token
        res.status(200).send({
          userId: searchUserEmail.data._id,
          username: searchUserEmail.data.username,
          email: searchUserEmail.data.email,
          token: generateToken(searchUserEmail),
        });
        return;
      }
    }
    console.log("user login complete");

    res.status(401).send({ error: "Unauthorized access" });
  } catch (error) {
    console.log(error);
  }
});

//#############################################################

module.exports = authRouter;
