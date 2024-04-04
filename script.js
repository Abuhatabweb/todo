let input = document.querySelector(".text-box")
let btn = document.querySelector(".submit")
let taskDiv = document.querySelector(".task-div")

let taskArray = []

getFromStorage()

// Add task
btn.onclick = function () {
    if(input.value != "") {
        addTaskToArray(input.value);
        input.value = ''
    }
}

function addTaskToArray(inputText){
    let task = {
        id: Date.now(),
        text: inputText,
        complete: false
    }
    taskArray.push(task)
    addElementToPage(taskArray)
    addElementToStorage(taskArray)
}

function addElementToPage(taskArray) {
    taskDiv.innerHTML = ""
    taskArray.forEach((task) => {
        let div = document.createElement("div")
        div.className = "task"
        div.setAttribute("id" , task.id)
        div.innerHTML= task.text
        let del = document.createElement("span")
        del.className = "del"
        del.innerHTML = "Delete"
        div.appendChild(del)
        taskDiv.appendChild(div)
        if(task.complete == true){
            div.classList.add("active")
        }
    });
}

function addElementToStorage(taskArray){
    window.localStorage.setItem("tasks" , JSON.stringify(taskArray))
}

function getFromStorage () {
  let data =  window.localStorage.getItem("tasks")
  if (data){
    let tasks = JSON.parse(data)
    taskArray = tasks
    addElementToPage(taskArray)
  }
}

// remove task 
taskDiv.addEventListener("click" , (e) => {
    //delete
    if(e.target.classList.contains("del")){
        e.target.parentElement.remove();
        // remove from storage
        taskArray = taskArray.filter((task) => task.id != e.target.parentElement.getAttribute("id"))
        addElementToStorage(taskArray)
    }

    // complete
    if(e.target.classList.contains("task")){
       e.target.classList.toggle("active")
       completeUpdate(e.target.getAttribute("id"))
    }
})

function completeUpdate(taskId){
    for (let i = 0; i < taskArray.length; i++) {
        if (taskArray[i].id == taskId) {
            taskArray[i].complete == false ? (taskArray[i].complete = true) : (taskArray[i].complete = false);
        } 
    }
    addElementToStorage(taskArray)
}
