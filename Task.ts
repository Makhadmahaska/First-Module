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
