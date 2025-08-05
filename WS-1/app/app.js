const client = new WebSocket('ws://localhost:3000');
function sendMessage(event){
    event.preventDefault();
    const input = document.getElementById("text");
    if(input.value){
        client.send(input.value);
        input.value = "";

    }
    input.focus();

    

}

const suby = document.getElementById("sub");
suby.addEventListener("click",sendMessage);

// client.addEventListener("message",({data})=>{
//     const li = document.createElement('li');
//     li.textContent = data;
//     console.log(data.text())
//     //console.log(data instanceof Blob)
//     //data is a instance of blob which is raw binary data
//     document.querySelector('ul').appendChild(li);
// });

client.addEventListener("message",({data})=>{
  let text = data;
  if(data instanceof Blob){
    data.text().then(mes => text = mes);
  }
  console.log(text);
  const li = document.createElement('li');
  li.textContent = text;
  document.querySelector('ul').appendChild(li);

});
