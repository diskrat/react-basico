const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const fs = require('fs/promises');
const path = require('path');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Simple CORS middleware to replace json-server's default CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");
    if ('OPTIONS' === req.method) {
        return res.sendStatus(200);
    }
    next();
});

const dbPath = path.join(__dirname, 'db.json');

// Helper functions for reading/writing DB
async function getDb() {
    try {
        const data = await fs.readFile(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading db.json", err);
        return { topicos: [], posts: [] };
    }
}

async function saveDb(data) {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

// REST API Endpoints
app.get('/topicos', async (req, res) => {
    const db = await getDb();
    res.json(db.topicos);
});

app.get('/topicos/:idTopico/posts', async (req, res) => {
    const db = await getDb();
    const idTopico = Number(req.params.idTopico);
    const posts = db.posts.filter(p => p.idTopico === idTopico);
    res.json(posts);
});

app.post('/topicos/:idTopico/posts', async (req, res) => {
    const db = await getDb();
    const idTopico = Number(req.params.idTopico);

    // Auto-increment ID
    const newId = db.posts.length > 0 ? Math.max(...db.posts.map(p => p.id)) + 1 : 1;

    const newPost = {
        id: newId,
        idTopico,
        ...req.body
    };

    db.posts.push(newPost);
    await saveDb(db);

    res.status(201).json(newPost);
});

// Socket.io Setup
const serverIo = http.createServer(app);
const io = new Server(serverIo, {
    cors: {
        origin: "*"
    }
});

let messageId = 0;
io.on('connection', (socket) => {
    console.log(`user connected: ${socket.id}`);
    socket.on('message', ({ message, user }) => {
        io.emit('message', { id: messageId, user, message });
        messageId++;
        console.log(message);
    });

    socket.on('disconnect', () => {
        console.log(`user disconnected: ${socket.id}`);
    });
});

// Start the REST API on 3000
app.listen(3000, () => {
    console.log('Express API is running on http://localhost:3000');
});

// Start Socket.io on 3001
serverIo.listen(3001, () => {
    console.log('Socket.io server is running on port 3001');
});