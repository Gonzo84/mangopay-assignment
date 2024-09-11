import {defineStore} from "pinia";

export type StatusTypes = 'pending' | 'inProgress' | 'completed';

// Mapping of status types to their display names
export const STATUS_MAP = {
    pending: 'Pending',
    inProgress: 'In Progress',
    completed: 'Completed'
}

// Type for a task
export type TaskType = {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: StatusTypes;
};

// Type for the state of the tasks store
type TasksStoreState = {
    tasks: TaskType[]; // Array of tasks
};

const useTasksStore = defineStore("tasks", {
    // Initial state of the store
    state: (): TasksStoreState => ({
        tasks: [], // Initially, there are no tasks
    }),
    actions: {
        // Action to add a task
        addTask(task: TaskType): void {
            this.tasks.push(task); // Add the task to the tasks array
        },
        // Action to update a task
        updateTask(updatedTask: TaskType): void {
            const index = this.tasks.findIndex((task: TaskType) => task.id === updatedTask.id);
            if (index !== -1) {
                this.tasks[index] = updatedTask; // Update the task at the found index
            }
        },
        // Action to delete a task
        deleteTask(id: string): void {
            const index = this.tasks.findIndex((task: TaskType) => task.id === id);
            if (index !== -1) {
                this.tasks.splice(index, 1); // Remove the task at the found index
            }
        },
        // Action to get a task by id
        getTask(id: string): TaskType | undefined {
            return this.tasks.find((task: TaskType) => task.id === id); // Find and return the task with the given id
        },
        // Action to reset the store
        resetStore(): void {
            this.tasks = []; // Reset the tasks array to an empty array
        },
    },
    getters: {
        // Getter to get all tasks
        getAllTasks(state: TasksStoreState): TaskType[] {
            return state.tasks; // Return the tasks array from the state
        },
    },
});

export default useTasksStore;
