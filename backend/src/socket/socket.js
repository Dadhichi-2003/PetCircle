const {Server} = require('socket.io');
const express = require('express');
const http =require ('http');

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:process.env.URL,
        methods:['GET','POST']
    }
})

const UserSocketMap = { }; //aa map socket id store krse ena userid ne corresponding , me login kryu to mari sokcet id aa object ma avse

const getReceiverSocketId = (receiverId) => UserSocketMap[receiverId];

io.on('connection',(socket)=>{
    const userId = socket.handshake.query.userId;
    if(userId){
        UserSocketMap[userId] = socket.id;
        console.log(`User connected : userID = ${userId},SocketId = ${socket.id}`);
        
    }
    io.emit('getOnlineUsers',Object.keys(UserSocketMap));
    console.log(UserSocketMap)
    socket.on('disconnect',()=>{
        if (userId) {
            console.log(`User disconnected : userID = ${userId}, SocketId = ${socket.id}`);
            delete UserSocketMap[userId]; // ✅ This is also missing
          }
          io.emit('getOnlineUsers', Object.keys(UserSocketMap)); // re-broadcast after removal
    })
})

module.exports={app,server,io,getReceiverSocketId}