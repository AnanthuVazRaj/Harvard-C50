

const socket = io('ws://localhost:3500');
const nameInput = document.getElementById("name");
const textInput = document.getElementById("message");

const textSend = document.getElementById('textSend');
//get func
  function openModal() {
            document.getElementById('myModal').style.display = 'block';
            document.getElementById('modalOverlay').style.display = 'block';
            
        }


let people = []//names of people


//create the people choises
function more(){
    //console.log("**")
    people =  (people).filter(s=> s!== nameInput.value)
    people.forEach((i)=>{
    //   console.log(i)
        li = document.createElement("button")
        li.className = `people`
        li.id = `${i}`
        li.textContent = `${i}`
        // li.onclick = function() {
         

        
        // }
        li.addEventListener('click',(e)=>{
            openModal();
            modalhandling(i)
            
        })
       // li.addEventListener('click',testHandler(i))
        
        
        //document.getElementsByClassName("active_People").appendChild(li)
        document.getElementById('active_People').appendChild(li)
    })

}

function modalhandling(who){
    
    modin = document.getElementById('TextBoox');
    modsub = document.getElementById('textSend');
    modsub.addEventListener('click',tink)
    function tink(){
        if(modin.value){
            console.log(`"${modin.value}" was send to => ${who}`);
            socket.emit('heheSend',{
                name_receiver: who,
                text_sent: modin.value
            })
        }
         modin.value = "";
    }
    document.querySelector("span").addEventListener('click',()=>{
        modsub.removeEventListener('click',tink);
    })
}


socket.on('messageGotton',({name_sender,text_sent})=>{
    console.log(`${name_sender}: ${text_sent}`)

})
function modalCreation(){
    bob = document.createElement("div");
    // bob.innerHTML = `
    //     <form class="form-join">
    //         <input type="text" id="name" maxlength="8" placeholder="Your name" size="25" required>
    //         <button id="join" type="submit">Confirm</button>
    //     </form>
    //     <ul class="chat-display"></ul>
    //     <form class="form-msg">
    //         <input type="text" id="message" placeholder="Your message" required>
    //         <button type="submit">Send</button>
    //     </form>
    // `;

    bob.innerHTML = `
    <div class="modal-content">
            <input type = "text" placeholder="name">
            <input type = "submit" placeholder="submit">
            <p>This is a movable modal window. Drag the header to move it.</p>
        </div>
    `
    bob.className = "main_chat"
    document.querySelector("main").appendChild(bob)
}


//document.que
function intro(e){
    e.preventDefault()
    if(nameInput.value){
     //   console.log("222")
        socket.emit('intro',nameInput.value);
      
    

    }
}
socket.on('allPeopleOn',(data)=>{
            people = data;
            console.log("LOOK HERE")
            console.log(people)
            document.getElementById("active_People").innerHTML = '<h1 class="peopleHeading">THE PEOPLE</h1>'
            more()


        })


document.getElementById('join').addEventListener('click',intro);

function goRoom(roo){
    socket.send('rooming',{
        name: nameInput.value,
        room: roo
    })
}


//modal
