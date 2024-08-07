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

let messageId = 0
io.on('connection', (socket) => {
    console.log(`user connected: ${socket.id}`);
    socket.on('message', ({message,user}) => {
        io.emit('message', {id:messageId,user:user,message:message});
        messageId=messageId+1
        console.log(message);
    });

    socket.on('disconnect', () => {
        console.log(`user disconnected: ${socket.id}`);
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