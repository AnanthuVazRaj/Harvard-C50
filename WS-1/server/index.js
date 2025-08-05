const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });

server.on("connection", (socket)=>{
    socket.on("message",(message)=>{
        // esentially socket.send is socket. emit but the event it sends is automatically "message"
        socket.send(`${message}`)
        console.log(message)
    })
})

