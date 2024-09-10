import {defineStore} from "pinia";

export type StatusTypes = 'pending' | 'inProgress' | 'completed';

export type TaskType = {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: StatusTypes;
};

type TasksStoreState = {
    tasks: TaskType[];
};

const useTasksStore = defineStore("tasks", {
    state: (): TasksStoreState => ({
        tasks: [],
    }),
    actions: {
        addTask(task: TaskType): void {
            this.tasks.push(task);
        },
        updateTask(updatedTask: TaskType): void {
            const index = this.tasks.findIndex((task: TaskType) => task.id === updatedTask.id);
            if (index !== -1) {
                this.tasks[index] = updatedTask;
            }
        },
        deleteTask(id: string): void {
            const index = this.tasks.findIndex((task: TaskType) => task.id === id);
            if (index !== -1) {
                this.tasks.splice(index, 1);
            }
        },
        getTask(id: string): TaskType | undefined {
            return this.tasks.find((task: TaskType) => task.id === id);
        },
        resetStore(): void {
            this.tasks = [];
        },
    },
    getters: {
        getAllTasks(state: TasksStoreState): TaskType[] {
            return state.tasks;
        },
    },
});

export default useTasksStore;
