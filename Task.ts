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