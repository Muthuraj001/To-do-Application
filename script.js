const input=document.getElementById("taskInput");
const addBtn=document.getElementById("addBtn");
const taskList=document.getElementById("taskList");
const count=document.getElementById("taskCount");
const filters=document.querySelectorAll(".filter");

let tasks=[];
try {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
} catch (error) {
    tasks = [];
    localStorage.removeItem("tasks");
}

let currentFilter="all";

function saveTasks(){

localStorage.setItem("tasks",JSON.stringify(tasks));

}

function updateCount(){

count.innerText=`${tasks.length} Tasks`;

}

function renderTasks(){

taskList.innerHTML="";

let filtered=tasks.filter(task=>{

if(currentFilter==="active") return !task.completed;

if(currentFilter==="completed") return task.completed;

return true;

});

filtered.forEach((task,index)=>{

let li=document.createElement("li");
if (task.completed) {
    li.classList.add("completed");
}

let taskText=document.createElement("div");
taskText.className="task-text";

let text=document.createElement("span");
text.innerText=task.text;

taskText.appendChild(text);
li.appendChild(taskText);

let actions=document.createElement("div");

actions.className="actions";

let complete=document.createElement("button");

complete.innerText="✔";

complete.className="complete";

complete.onclick=()=>{

task.completed=!task.completed;

saveTasks();

renderTasks();

};

let edit=document.createElement("button");

edit.innerText="Edit";

edit.className="edit";

edit.onclick=()=>{

let newTask=prompt("Edit Task",task.text);

if(newTask){

task.text=newTask;

saveTasks();

renderTasks();

}

};

let del=document.createElement("button");

del.innerText="Delete";

del.className="delete";

del.onclick=()=>{

tasks=tasks.filter(t=>t!==task);

saveTasks();

renderTasks();

};

actions.appendChild(complete);

actions.appendChild(edit);

actions.appendChild(del);

li.appendChild(actions);

taskList.appendChild(li);

});

updateCount();

}

addBtn.onclick=()=>{

let value=input.value.trim();

if(value==="") return;

tasks.push({

text:value,

completed:false

});

saveTasks();

renderTasks();

input.value="";

}

input.addEventListener("keypress",e=>{

if(e.key==="Enter")

addBtn.click();

});

filters.forEach(btn=>{

btn.onclick=()=>{

document.querySelector(".active").classList.remove("active");

btn.classList.add("active");

currentFilter=btn.dataset.filter;

renderTasks();

};

});

renderTasks();