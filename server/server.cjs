const jsonServer = require('json-server')
const express = require('express');
const app = express();
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()


const http = require('http');
const serverIo = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(serverIo,{
    cors: {
      origin: "*"
    }
  });


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', `${socket.id} + ${message}`);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.use(middlewares)
server.use
server.use(jsonServer.rewriter({
    "/topicos/:idTopico/posts": "/posts?idTopico=:idTopico"
}))

server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

serverIo.listen(3001,() => {
    console.log('Socket.io is running')
})