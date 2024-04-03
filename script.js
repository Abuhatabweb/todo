let input = document.querySelector(".text-box")
let btn = document.querySelector(".submit")
let taskDiv = document.querySelector(".task-div")

taskArray = []
// return from local storage
localstorageReturn = function() {
    tasks =window.localStorage.getItem("tasks")
    taskArray = JSON.parse(tasks)
    taskArray.forEach(task => {
        let div = document.createElement("div")
        div.className = "task"
        div.setAttribute("id" , task.id)
        div.innerHTML= task.text
        let del = document.createElement("span")
        del.className = "del"
        del.innerHTML = "Delete"
        div.appendChild(del)
        taskDiv.appendChild(div)
    });
}
localstorageReturn()

btn.onclick = function () {
    let task = {
        id: Date.now(),
        text: input.value,
        done: false
    } 
    // Add task to page
    if(task.text !=""){
    input.value = ""
    let div = document.createElement("div")
    div.className = "task"
    div.setAttribute("id" , task.id)
    div.innerHTML= task.text
    let del = document.createElement("span")
    del.className = "del"
    del.innerHTML = "Delete"
    div.appendChild(del)
    taskDiv.appendChild(div)
    // Add task to array
    addToArray(task)
    // Add array to local storage
    arrayToLocal(taskArray)
}}


addToArray = function (task) {
    taskArray.push(task)
}

arrayToLocal = function(array){
    window.localStorage.setItem("tasks" , JSON.stringify(taskArray))
}

// remove task 
taskDiv.addEventListener("click" , (e) => {
    if(e.target.classList.contains("del")){
        e.target.parentElement.remove();
        // remove from storage
        taskArray = taskArray.filter((task) => task.id != e.target.parentElement.getAttribute("id"))
        arrayToLocal(taskArray)

    }
})


