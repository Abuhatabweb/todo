let input = document.querySelector(".text-box")
let btn = document.querySelector(".submit")
let taskDiv = document.querySelector(".task-div")

let taskArray = []

input.addEventListener("keydown" , (e)=>{
    if (e.key == "Enter") {
        btn.click()
    }
})

getFromStorage()

// Add task
btn.onclick = function () {
    if (input.value != "") {
        addTaskToArray(input.value);
        input.value = ''
    }
}

function addTaskToArray(inputText) {
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
        div.setAttribute("id", task.id)
        div.innerHTML = `<p class ="p-text">${task.text}</p>`
        let div2 = document.createElement("div")
        div2.className = "div2"
        let del = document.createElement("span")
        del.className = "del"
        del.innerText = "Delete"
        let done = document.createElement("input")
        done.type = "checkbox"
        done.id = "done"
        div2.append(done, del)
        div.appendChild(div2)
        taskDiv.appendChild(div)
        if (task.complete == true) {
            div.classList.add("active")
            if (div.classList.contains("active")) {
                done.setAttribute("checked", "")
                let doneParent = done.parentElement
                doneParent.previousElementSibling.style.textDecoration = "line-through 3px #C7253E"
            }
        }
    });
}







function addElementToStorage(taskArray) {
    window.localStorage.setItem("tasks", JSON.stringify(taskArray))
}

function getFromStorage() {
    let data = window.localStorage.getItem("tasks")
    if (data) {
        let tasks = JSON.parse(data)
        taskArray = tasks
        addElementToPage(taskArray)
    }
}

// remove task 
taskDiv.addEventListener("click", (e) => {
    //delete
    if (e.target.classList.contains("del")) {
        let con = confirm("Are You Sure")
        if (con) {
            let parent = e.target.parentElement;
            parent.parentElement.remove()

            
            // remove from storage
            taskArray = taskArray.filter((task) => task.id != parent.parentElement.getAttribute("id"))
            addElementToStorage(taskArray)
        }
        
    }

    // complete
    else if (e.target.id = "done") {
        if (e.target.checked) {
            let parentCheck = e.target.parentElement
            parentCheck.previousElementSibling.style.textDecoration = "line-through 3px #C7253E"
            let parent = e.target.parentElement;
            parent.parentElement.classList.add("active")
            completeUpdate(parent.parentElement.getAttribute("id"))
        } else {
            let parentCheck = e.target.parentElement
            parentCheck.previousElementSibling.style.textDecoration = "none"
            let parent = e.target.parentElement;
            parent.parentElement.classList.remove("active")
            completeUpdate(parent.parentElement.getAttribute("id"))
        }
    }

})

function completeUpdate(taskId) {
    for (let i = 0; i < taskArray.length; i++) {
        if (taskArray[i].id == taskId) {
            taskArray[i].complete == false ? (taskArray[i].complete = true) : (taskArray[i].complete = false);
        }
    }
    addElementToStorage(taskArray)
}
