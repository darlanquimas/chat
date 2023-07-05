import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});

const port = 3002;

io.on("connection", (socket) => {
  console.log("Usuário conectado!", socket.id);

  socket.on("set_username", (username) => {
    socket.data.username = username;
  });

  socket.on("disconnect", (reason) => {
    console.log("usuario desconectado", socket.id);
  });

  socket.on("message", (text) => {
    io.emit("receive_message", {
      text,
      authorId: socket.id,
      author: socket.data.username,
    });
  });
});

server.listen(port, () => {
  console.log("server runing");
});
