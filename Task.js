// index.ts / task-manager.ts
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// --------------------
// DOM Elements
// --------------------
var taskForm = document.getElementById("task-form");
var taskTitle = document.getElementById("task-title");
var taskDesc = document.getElementById("task-desc");
var taskPriority = document.getElementById("task-priority");
var taskList = document.getElementById("task-list");
var taskFilters = document.getElementById("task-filters");
// --------------------
// App State
// --------------------
var tasks = [];
// Load tasks from localStorage
function loadTasks() {
    var saved = localStorage.getItem("tasks");
    if (saved) {
        tasks = JSON.parse(saved).map(function (t) { return (__assign(__assign({}, t), { createdAt: new Date(t.createdAt) })); });
    }
}
// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
// --------------------
// Task Operations
// --------------------
// Add new task
function addTask(title, description, priority) {
    var newTask = {
        id: Date.now(),
        title: title,
        description: description,
        completed: false,
        priority: priority,
        createdAt: new Date(),
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
}
// Toggle completion
function toggleTaskCompletion(id) {
    tasks = tasks.map(function (task) { return task.id === id ? __assign(__assign({}, task), { completed: !task.completed }) : task; });
    saveTasks();
    renderTasks();
}
// Delete task
function deleteTask(id) {
    tasks = tasks.filter(function (task) { return task.id !== id; });
    saveTasks();
    renderTasks();
}
// Edit task
function editTask(id, title, description, priority) {
    tasks = tasks.map(function (task) { return task.id === id ? __assign(__assign({}, task), { title: title, description: description, priority: priority }) : task; });
    saveTasks();
    renderTasks();
}
// --------------------
// Render Tasks
// --------------------
function renderTasks(filter) {
    if (filter === void 0) { filter = "all"; }
    taskList.innerHTML = "";
    var filteredTasks = tasks.filter(function (task) {
        if (filter === "all")
            return true;
        if (filter === "completed")
            return task.completed;
        if (filter === "pending")
            return !task.completed;
        return true;
    });
    filteredTasks.forEach(function (task) {
        var _a, _b, _c;
        var taskDiv = document.createElement("div");
        taskDiv.className = "task-item ".concat(task.completed ? "completed" : "");
        taskDiv.innerHTML = "\n            <h3>".concat(task.title, " <span class=\"priority\">").concat(task.priority, "</span></h3>\n            <p>").concat(task.description || "", "</p>\n            <small>").concat(task.createdAt.toLocaleString(), "</small>\n            <div class=\"task-actions\">\n                <button class=\"complete-btn\">").concat(task.completed ? "Undo" : "Complete", "</button>\n                <button class=\"edit-btn\">Edit</button>\n                <button class=\"delete-btn\">Delete</button>\n            </div>\n        ");
        // Event listeners for buttons
        (_a = taskDiv.querySelector(".complete-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { return toggleTaskCompletion(task.id); });
        (_b = taskDiv.querySelector(".delete-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () { return deleteTask(task.id); });
        (_c = taskDiv.querySelector(".edit-btn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
            var newTitle = prompt("Edit title", task.title);
            var newDesc = prompt("Edit description", task.description || "");
            var newPriority = prompt("Edit priority (low, medium, high)", task.priority);
            if (newTitle && newPriority) {
                editTask(task.id, newTitle, newDesc || "", newPriority);
            }
        });
        taskList.appendChild(taskDiv);
    });
    renderStats();
}
// --------------------
// Task Statistics
// --------------------
function renderStats() {
    var total = tasks.length;
    var completed = tasks.reduce(function (acc, t) { return t.completed ? acc + 1 : acc; }, 0);
    var pending = total - completed;
    var statsDiv = document.getElementById("task-stats");
    if (statsDiv) {
        statsDiv.innerHTML = "Total: ".concat(total, " | Completed: ").concat(completed, " | Pending: ").concat(pending);
    }
}
// --------------------
// Event Listeners
// --------------------
taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addTask(taskTitle.value, taskDesc.value, taskPriority.value);
    taskForm.reset();
});
taskFilters.addEventListener("click", function (e) {
    var target = e.target;
    if (target.tagName === "BUTTON") {
        var filter = target.dataset.filter;
        renderTasks(filter);
    }
});
// --------------------
// Initialize App
// --------------------
loadTasks();
renderTasks();
