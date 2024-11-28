
// loads user data from local storage
userContainer = JSON.parse(localStorage.getItem('data'));


const lastUser = userContainer[userContainer.length - 1];
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");



// editing text in HTML
document.getElementById('welcomeMessage').textContent = `Welcome, ${lastUser.code}!`; 



// logout event
document.querySelector('.logout-btn').addEventListener('click', () => {
    alert("Logging out...");
    window.location.href = './index.html';
});



// Displaying tasks once loading 
loadTasks();

// Add a new task function
addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTask(taskText, false); // New tasks are not completed by default
        taskInput.value = "";
        saveTasks();
    }
});

// Add task when pressing Enter
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTaskBtn.click();
    }
});

// Function to add a new task
function addTask(taskText, isCompleted) {
    const li = document.createElement("li");
    if (isCompleted) li.classList.add("completed");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskSpan.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        taskList.removeChild(li);
        saveTasks();
    });

    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach((li) => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => addTask(task.text, task.completed));
}

