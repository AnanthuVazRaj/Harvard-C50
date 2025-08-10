import express from 'express'
import { Server } from "socket.io"
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = 3500
const ADMIN = "Admin"

const app = express()

app.use(express.static(path.join(__dirname, "public")))

const expressServer = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

// state 
const UsersState = {
    users: [],
    setUsers: function (newUsersArray) {
        this.users = newUsersArray
    }
}
const RoomState = {
    rooms: [],
    setRooms: function (newRoomsArray) {
        this.rooms = newRoomsArray
    }
}

const io = new Server(expressServer,{
    cors:{
        origin:"*"
    }
})
io.on('connection',(socket)=>{
    socket.on('intro',(data)=>{
        activateUser(socket.id,data)
       // console.log("wow")
        io.emit('allPeopleOn', returnUserNameList());
    })
    socket.on('rooming',({nam,room})=>{
        activatePerson(nam,room)
    })
    socket.on('disconnect',()=>{
    UsersState.users = UsersState.users.filter(user=> user.id !== socket.id)
        io.emit('allPeopleOn', returnUserNameList());
       // console.log("****");
       // io.emit('lefty',(UsersState.users.find(user=> user.id = socket.id)).name)
      //--> io.emit('lefty',(UsersState.users.find(user=> user.id = socket.id)).name);
      // console.log((UsersState.users.find(user=> user.id = socket.id)).name);

    })

    socket.on('heheSend',(data)=>{
        const {name_receiver,text_sent} = data;
        let idOut = UsersState.users.find(user => user.name === name_receiver);
       // console.log(idOut)
        io.to(idOut.id).emit('messageGotton',{
            name_sender:(UsersState.users.find(user => user.id === socket.id)).name,
            text_sent
        })

    })
     



})


function activateUser(id, name) {
    const user = { id, name }
    UsersState.setUsers([
        ...UsersState.users.filter(user => user.id !== id),
        user
    ])
    //return user
}
function activatePerson(name, room) {
    const user = {name, room }
    UsersState.setUsers([
        ...UsersState.users.filter(user => user.room !== room),
        user
    ])
    //return user
}
function returnUserList(id){
    return UsersState.users.filter(user => user.id !== id);
 }

 function returnUserNameList(){
     //const users = UsersState.users.filter(user => user.id !== id);
     return Array.from(UsersState.users.map(user => user.name));

 }
function removeUser(nam){
      let temp = document.getElementById(nam)
      if(!temp){

      }
}
