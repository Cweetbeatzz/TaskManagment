const { verifyToken } = require("../helpers/Jwt");

//###########################################

const ensureLoggedIn = (req, res, next) => {
  const authorization = req.headers.authorization;
  try {
    // JWT
    //must be logged in before access
    if (!authorization || !authorization.startsWith("Bearer")) {
      res
        .status(401)
        .send({ message: "Error", data: "invalid credentials..." });
    }
    const token = authorization.split(" ")[1];
    const decoded = verifyToken(token);

    req.userId = decoded?._id;
    req.username = decoded?.username;
    req.email = decoded?.email;

    const { email } = decoded;
    if (req.email || req.username || req.userId) {
      next();
    } else {
      res.status(401).send({ message: "Error", data: "Not Authorized..." });
    }
  } catch (error) {
    res.status(401).send({ message: "Error", data: "Not Authorized..." });
  }
};

//###########################################

module.exports = { ensureLoggedIn };
