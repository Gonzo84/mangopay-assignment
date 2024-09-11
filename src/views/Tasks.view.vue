<template>
    <div class="flex flex-col p-4 h-full items-center">
        <h2 class="text-3xl font-bold text-center p-4">List of tasks</h2>
        <TasksList @edit-task="openTaskEditModal" @delete-task="onTaskDelete"></TasksList>
        <div class="fixed bottom-5 right-5 sm:bottom-20 sm:right-20">
            <button
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 shadow-lg font-semibold py-2 focus:outline-none rounded-lg"
                @click="showModal = true">
                + Add new task
            </button>
        </div>
    </div>
    <AddEditTaskModal v-if="showModal" :task-data="modalData" @close-modal="closeModal" @task-added="onTaskAdded"
                      @task-edited="onTaskEdited"></AddEditTaskModal>
</template>

<script setup lang="ts">
import TasksList from "@/components/tasks/TasksList.component.vue";
import AddEditTaskModal from "@/components/modals/AddEditTask.modal.vue";
import {onMounted, ref, onUnmounted, Ref} from "vue";
import {monitorTasksCollection, addTask, updateTask, deleteTask} from "@/services/Tasks.service.ts";
import {Unsubscribe} from "firebase/firestore";
import {TaskType} from "@/store/tasks.store.ts";
import useTasksStore from "@/store/tasks.store.ts";

// Reference to the tasks store
const tasksStore = useTasksStore();

// Reference to the unsubscribe function returned by monitorTasksCollection
const unsubscribeRef = ref<Unsubscribe | null>(null);

// Reactive property to control the visibility of the modal
const showModal = ref(false);

// Reactive property to hold the data of the task being edited
let modalData: Ref<TaskType | null> = ref(null);

// Method to open the task edit modal with the provided task data
const openTaskEditModal = (taskData: TaskType) => {
    modalData.value = taskData;
    showModal.value = true;
};
// Method to close the modal and reset the modal data
const closeModal = () => {
    showModal.value = false;
    modalData.value = null;
};
// Method to add a new task
const onTaskAdded = (taskData: TaskType) => {
    addTask(taskData)
        .then(() => {
            closeModal();
        })
        .catch((err) => {
            console.error(err);
            closeModal();
        });
};

// Method to delete a task
const onTaskDelete = (taskData: TaskType) => {
    deleteTask(taskData.id)
        .then(() => {
            closeModal();
        })
        .catch((err) => {
            console.error(err);
            closeModal();
        });
};

// Method to edit a task
const onTaskEdited = (taskData: TaskType) => {
    updateTask(taskData)
        .then(() => {
            closeModal();
        })
        .catch((err) => {
            console.error(err);
            closeModal();
        });
};

// Lifecycle hook that is called when the component is mounted
onMounted(() => {
    unsubscribeRef.value = monitorTasksCollection();
});

// Lifecycle hook that is called when the component is unmounted
onUnmounted(() => {
    tasksStore.resetStore();
    if (unsubscribeRef.value) {
        unsubscribeRef.value();
    }
});
</script>

<style scoped lang="scss">
</style>
