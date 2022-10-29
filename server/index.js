const express = require("express");
const cors = require("cors");
const http = require("http");
const socket = require("socket.io");
const app = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new socket.Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

//sendMessageToTheClient
io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", data);
  });
});

server.listen(8000, () => {
  console.log(`Server is running`);
});
