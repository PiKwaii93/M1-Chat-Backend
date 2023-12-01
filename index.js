const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
require("dotenv").config();
const mysql = require("mysql2");
const PORT = 4000;
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
const usersRouter = require("./routes/users.routes");
const messagesRouter = require("./routes/messages.routes");
const conversationsRouter = require("./routes/conversations.routes");

app.use(express.json());
app.use(cors());
let users = [];

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);
  });

  socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data));

  socket.on("newUser", (data) => {
    users.push(data);
    socketIO.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit("newUserResponse", users);
    socket.disconnect();
  });
});

app.use("/api/users", usersRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/conversations", conversationsRouter);

http.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
