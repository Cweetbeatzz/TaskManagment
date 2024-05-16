const jwt = require("jsonwebtoken");
require("dotenv").config();

//#####################################################

const generateToken = (user) => {
  const token = jwt.sign(
    {
      _id: user.data._id,
      username: user.data.username,
      email: user.data.email,
    },
    process.env.JWT_SECRET_KEY || "UBEBC93H84HF384HF3BUVB3BV84VBU3",
    { expiresIn: "90d", algorithm: "HS256" }
  );
  return token;
};

//#####################################################

const verifyToken = (token) => {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET_KEY || "UBEBC93H84HF384HF3BUVB3BV84VBU3",
    {
      algorithms: ["HS256"],
    }
  );
  return decoded;
};

module.exports = { generateToken, verifyToken };
