// const WebSocket = require('ws');
// const server = new WebSocket.Server({ port: 3000 });

// server.on("connection", (socket)=>{
//     socket.on("message",(message)=>{
//         // esentially socket.send is socket. emit but the event it sends is automatically "message"
//         socket.send(`${message}`)
//         console.log(message)
//     })
// })
import express from 'express'
import path from 'path'
import {Server} from "socket.io"
import {fileURLToPath} from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PORT = 3500;
const app = express();
app.use(express.static(path.join(__dirname, "public")));
const expressServer = app.listen(PORT, ()=>{
    console.log(`LISTNING ON ${PORT}`);
});
// httpServer = require("http").createServer()

 const io = new Server(expressServer,{
    cors:{
          //origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500"]
          origin: "*"
     }
  })
// httpServer = require("http").createServer();
// const io =  require("socket.io")(httpServer,{
//     cors:{
//         origin:"*"
//     }
// });

//io goes to every one in the sever, socket goes to one
io.on("connection",(socket)=>{
    console.log(`User${socket.id} connected`);
    //opon connection - only to user
    socket.emit('message',"WELCOME TO CHAT APP");
    //opon connection to - all others
    socket.broadcast.emit('message',`${socket.id.substring(0,5)} HAS JOINED`)
    //listening for message event
    socket.on('message',data=>{
        
        console.log(data)
        io.emit('message',`${socket.id.substring(0,5)}: ${data}`)

    })
    //when user disconnects - all others
    socket.on('disconnect',()=>{
        socket.broadcast.emit('message',`Usr ${socket.id.substring(0,5)} disconnected`);
    })
    //listem fro activty
    socket.on('activity',(name)=>{
        socket.broadcast.emit('activity',name)
    })
    
})

