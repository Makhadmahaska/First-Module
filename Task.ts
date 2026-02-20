// index.ts / task-manager.ts

// --------------------
// Type Definitions
// -------------------
type Priority = "low" | "medium" | "high";

interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    priority: Priority;
    createdAt: Date;
    category?: string;
}

const taskForm = document.getElementById("task-form") as HTMLFormElement;
const taskTitle = document.getElementById("task-title") as HTMLInputElement;
const taskDesc = document.getElementById("task-desc") as HTMLTextAreaElement;
const taskPriority = document.getElementById("task-priority") as HTMLSelectElement;
const taskList = document.getElementById("task-list") as HTMLDivElement;
const taskFilters = document.getElementById("task-filters") as HTMLDivElement;



let tasks: Task[] = [];


function loadTasks() {
    const saved = localStorage.getItem("tasks");
    if (saved) {
        tasks = JSON.parse(saved).map((t: any) => ({ ...t, createdAt: new Date(t.createdAt) }));
    }
}


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function addTask(title: string, description: string, priority: Priority) {
    const newTask: Task = {
        id: Date.now(),
        title,
        description,
        completed: false,
        priority,
        createdAt: new Date(),
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
}


function toggleTaskCompletion(id: number) {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    saveTasks();
    renderTasks();
}



function deleteTask(id: number) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}


function editTask(id: number, title: string, description: string, priority: Priority) {
    tasks = tasks.map(task => task.id === id ? { ...task, title, description, priority } : task);
    saveTasks();
    renderTasks();
}

function renderTasks(filter: "all" | "completed" | "pending" = "all") {
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task => {
        if (filter === "all") return true;
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.className = `task-item ${task.completed ? "completed" : ""}`;
        taskDiv.innerHTML = `
            <h3>${task.title} <span class="priority">${task.priority}</span></h3>
            <p>${task.description || ""}</p>
            <small>${task.createdAt.toLocaleString()}</small>
            <div class="task-actions">
                <button class="complete-btn">${task.completed ? "Undo" : "Complete"}</button>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        taskList.appendChild(taskDiv);
    });
}



taskList.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const taskDiv = target.closest(".task-item") as HTMLElement;
    if (!taskDiv) return;

    const taskId = Number(taskDiv.dataset.id);

    if (target.classList.contains("complete-btn")) toggleTaskCompletion(taskId);
    if (target.classList.contains("delete-btn")) deleteTask(taskId);
    if (target.classList.contains("edit-btn")) {
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;

        const newTitle = prompt("Edit title", task.title);
        const newDesc = prompt("Edit description", task.description || "");
        const newPriority = prompt("Edit priority (low, medium, high)", task.priority) as Priority;

        if (newTitle && newPriority) editTask(taskId, newTitle, newDesc || "", newPriority);
    }
});




function renderStats() {
    const total = tasks.length;
    const completed = tasks.reduce((acc, t) => t.completed ? acc + 1 : acc, 0);
    const pending = total - completed;

    const statsDiv = document.getElementById("task-stats");
    if (statsDiv) {
        statsDiv.innerHTML = `Total: ${total} | Completed: ${completed} | Pending: ${pending}`;
    }
}