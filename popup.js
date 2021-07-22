

let addButton = document.getElementById("addBtn");
let input = document.getElementById("todoInput");

let todoContainer = document.getElementById("todoContainer");

let todoListFromStorage = JSON.parse(localStorage.getItem("todo"));

addButton.addEventListener("click", () => {
  let value = input.value;
  console.log("input", value);

  if (value) {
    let todo = JSON.parse(localStorage.getItem("todo"));
    let newList = [];
    if (!todo) newList = [value];
    else newList = [...todo, value];
    todoContainer.innerText="";
    newList.forEach((e,index) => {
      let div = document.createElement("div");
      div.classList.add("card");
      let text = document.createElement("h1");
      text.innerText = e;
      let deleteButton = document.createElement("button");
      deleteButton.innerText = "X";
      deleteButton.classList.add("deleteButton")
      div.append(text);
      div.append(deleteButton);
      todoContainer.append(div);
      deleteButton.addEventListener("click",()=>{
        let listDeleted = todoListFromStorage.map((e,listIndex)=>{if(index===listIndex) return e});
        localStorage.setItem("todo", JSON.stringify(listDeleted));
        load();
      })
    })
    localStorage.setItem("todo", JSON.stringify(newList));
  }
})


window.addEventListener("load", () => {
  load();
})

function load(){
  todoContainer.innerText ="";
  if (todoListFromStorage) {
    todoListFromStorage.forEach((e,index) => {

      let div = document.createElement("div");
      div.classList.add("card");
      let text = document.createElement("h1");
      text.innerText = e;
      let deleteButton = document.createElement("button");
      deleteButton.innerText = "X";
      deleteButton.classList.add("deleteButton")
      div.append(text);
      div.append(deleteButton);
      todoContainer.append(div);
      deleteButton.addEventListener("click",()=>{
        let listDeleted = todoListFromStorage.reduce((acc,val,listIndex)=>{
          if(listIndex!==index){
            acc.push(val)
          }
        },[]);
        localStorage.setItem("todo", JSON.stringify(listDeleted));
        todoListFromStorage = listDeleted;
        load();
      })
    })
  }
}