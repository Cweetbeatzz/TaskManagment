const cors = require("cors");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const db = require("./Database/connection");
require("dotenv").config();
const TaskRouter = require("./Controller/TaskController");
const UserRouter = require("./Controller/UserController");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

//#############################################################

app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

let usersSockets = [];

const addUser = (userId, socketId) => {
  !usersSockets.some((user) => user.userId === userId) &&
    usersSockets.push({ userId, socketId });
};

const removeUser = (socketId) => {
  usersSockets = usersSockets.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return usersSockets.find((user) => user.userId === userId);
};

// Broadcasting To all connected clients except the sender
// WebSocket Connection
io.on("connection", (socket) => {
  console.log("a user connected with socket id:", socket.id);

  //take userId and socketId from user that will be scheduling tasks
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", usersSockets);
  });

  // Handle events for CRUD operations
  socket.on("taskCreated", (task) => {
    socket.broadcast.emit("taskCreated", task);
  });

  socket.on("taskUpdated", (task) => {
    socket.broadcast.emit("taskUpdated", task);
  });

  socket.on("taskDeleted", (taskId) => {
    socket.broadcast.emit("taskDeleted", taskId);
  });

  // Disconnect event
  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(`Socket ${socket.id} for user disconnected`);
  });
});
//#############################################################

//<----------- routes ---------------->
// app.use("/api/task", TaskRouter);
app.use("/api/tasks", TaskRouter(io));
app.use("/api/users", UserRouter);

//#############################################################

const PORT = process.env.PORT || 3200;
const API_URL = process.env.API_URL || `http://0.0.0.0:${PORT}`;

//#############################################################

// module.exports = { io };

//#############################################################

const startDB = async () => {
  try {
    // mongo db connection

    await db(
      process.env.MONGO_DB_CONNECTION_STRING ||
        "mongodb://127.0.0.1:27017/Tasks"
    );

    //server connection
    server.listen(PORT, console.log(`Server is running on ${API_URL}`));
  } catch (error) {
    console.log(error);
  }
};
// #####################################################################

startDB();
