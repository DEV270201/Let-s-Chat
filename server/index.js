const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(express.json());

// creating http server for socket.io so that it can attach its properties and work 
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

// for storing the users 
const users = new Map();

//creating a connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    // storing users information in the memory
    users.set(socket.id, {
        id: socket.id,
        username: `User${socket.id.substring(0, 4)}`
    });
    
    const user = users.get(socket.id);
    
    //emitting a welcome message to the user who joined
    socket.emit('message', {
        type: 'system',
        content: `Hello, ${user.username}!`,
        timeStamp: new Date(),
        username: `User${socket.id.substring(0, 4)}`
    });
    
    //disconnecting the user if some error occurs
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        users.delete(socket.id);
    });
   
    //logging error if occurs
    socket.on('error', (error) => {
        console.error('Error occurred:', error);
    });
    
    //when a user sends a message, we take that message and broadcast it to all users
    socket.on('message', (msg) => {
        console.log('Message received:', msg);
        const user = users.get(socket.id);
        
        io.emit('message', {
            type: 'user',
            username: user.username,
            content: msg,
            timeStamp: new Date().toISOString()
        });
    });
});

const port = 3001;
server.listen(port, () => {   
    console.log(`Server is running on http://localhost:${port}`);
});