

const socket = io('ws://localhost:3500');
const nameInput = document.getElementById("name");
const textInput = document.getElementById("message");

const textSend = document.getElementById('textSend');
//get func



let people = []//names of people

//testing
submitBut = [];

//create the people choises
function more(){
    //console.log("**")
    people =  (people).filter(s=> s!== nameInput.value)
    people.forEach((i)=>{
        li = document.createElement("button")
        li.className = `people`
        li.id = `${i}`
        li.textContent = `${i}`
        li.addEventListener('click', (e)=>{
            if(!document.getElementById(`myModal_${i}`)){
            openModal(i)
            console.log(document.getElementById(`myModal_${i}`))
            bingWho(i);
            modalhandling(i);
            mod = modCreation(undefined,undefined,undefined,undefined,i);
            movement(mod)
            }

            
        })
        document.getElementById('active_People').appendChild(li)
    })

}



socket.on('messageGotton',({name_sender,text_sent})=>{
    
    if(document.getElementById(`myModal_${name_sender}`)){
        li = document.createElement("h5");
        li.textContent = text_sent;
        document.getElementById(`chatAppear_${name_sender}`).appendChild(li);
    }else{
             openModal(name_sender)
            bingWho(name_sender);
            modalhandling(name_sender);
            mod = modCreation(undefined,undefined,undefined,undefined,name_sender);
            movement(mod)
            
            li = document.createElement("h5");
            li.textContent = text_sent;
            document.getElementById(`chatAppear_${name_sender}`).appendChild(li);



    }

    console.log(`${name_sender}: ${text_sent}`)

})

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


//modal
  function openModal(who) {
          //  document.getElementById('myModal').style.display = 'block';
          //  document.getElementById('modalOverlay').style.display = 'block';
          console.log(" WE IN HErE NOW");

            dih = document.createElement('div');
            dih.innerHTML = `
            <div class="modal-overlay" id="modalOverlay_${who}"></div>
             <div class="modal" id="myModal_${who}">
        <div class="modal-header" id="modalHeader_${who}">
            <span class="close-btn"  id = "close_${who}"onclick="closeModal()">&times;</span>
            <div class = "chatAppear" id = "chatAppear_${who}">
                
            </div>
            <h3>|${who}|</h3>
        </div>
        <div class="modal-content">
            <input type = "text" placeholder=" text send" id = "TextBoox_${who}">
            <button class = "allSubmitBut" id = "textSend_${who}"> SUBMIT</button>
            

        </div>
    </div>
            `;
            dih.id = "bigModal";
            document.querySelector("main").appendChild(dih);
            submitBut = document.querySelectorAll(".allSubmitBut");
            console.log(submitBut);
            //testing
            // return  new Promise((resolve) =>{
            //     resolve('IT DONE');
            // });

            
        }
// for closing
function modalhandling(who){
    
    modin = document.getElementById(`TextBoox_${who}`);
    modsub = document.getElementById(`textSend_${who}`);
    modsub.addEventListener('click',()=>{
        tink(who);
    })
    document.getElementById(`close_${who}`).addEventListener('click',()=>{
        //modsub.removeEventListener('click',tink);
        closeModal(who);
    })
    // document.querySelector("span").addEventListener('click',()=>{
    //     modsub.removeEventListener('click',tink);
    // })
}
function tink(x){
    modin = document.getElementById(`TextBoox_${x}`)
        if(modin.value){
            console.log(`"${modin.value}" was send to => ${x}`);
            socket.emit('heheSend',{
                name_receiver: x,
                text_sent: modin.value
            })
        }
         modin.value = "";
    }
MovementOfModals = {
    modals: [],
    newMod: function (mod){
        modals.push(mod)
    }
}

function modCreation(cx,cy,ix,iy, name){
    mod  = {
        cx ,
        cy,
        ix,
        iy,
        name
    };
    return mod;

}

function movement(mod){
        let isDragging = false;
        let who = mod.name;
        let currentX = mod.cx;
        let currentY = mod.cy;
        let initialX = mod.ix;
        let initialY=mod.iy;
        const modalHeader = document.getElementById(`modalHeader_${who}`)
        const modal = document.getElementById(`myModal_${who}`);
        //const modalOverlay = document.getElementById(`modalOverlay_${who}`)
        // Drag start
        modalHeader.addEventListener('mousedown', (e) => {
            initialX = e.clientX - currentX;
            initialY = e.clientY - currentY;
            isDragging = true;
        });

        // Drag end
       
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Drag move
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault(); 
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                modal.style.left = currentX + 'px';
                modal.style.top = currentY + 'px';
                modal.style.transform = 'none'; // Override initial centering
            }
        });

        // Initialize position
        currentX = window.innerWidth / 2 - modal.offsetWidth / 2;
        currentY = window.innerHeight / 2 - modal.offsetHeight / 2;
        modal.style.left = currentX + 'px';
        modal.style.top = currentY + 'px';
}


function closeModal(who) {
    const modalOverlay = document.getElementById(`modalOverlay_${who}`)
    const modal = document.getElementById(`myModal_${who}`);
            modal.style.display = 'none';
           modalOverlay.style.display = 'none';
        }
function bingWho(who){
     const modalOverlay = document.getElementById(`modalOverlay_${who}`)
             const modal = document.getElementById(`myModal_${who}`);
             console.log("******");
             console.log(modal);
            modal.style.display = 'block';
            modalOverlay.style.display = 'block';
}