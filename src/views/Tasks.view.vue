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
    <AddEditTaskModal :task-data="modalData" :show="showModal" @close-modal="closeModal" @task-added="onTaskAdded"
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

const tasksStore = useTasksStore();
const unmountRef = ref<Unsubscribe | null>(null);
const showModal = ref(false)
let modalData: Ref<TaskType | null> = ref(null)
const openTaskEditModal = (taskData: TaskType) => {
    modalData.value = taskData;
    showModal.value = true;
}
const closeModal = () => {
    showModal.value = false;
    modalData.value = null;
}
const onTaskAdded = (taskData: TaskType) => {
    addTask(taskData)
        .then(() => {
            closeModal();
        })
        .catch((err) => {
            console.error(err);
            closeModal();
        });
}
const onTaskDelete = (taskData: TaskType) => {
    deleteTask(taskData.id)
        .then(() => {
            closeModal();
        })
        .catch((err) => {
            console.error(err);
            closeModal();
        });
}
const onTaskEdited = (taskData: TaskType) => {
    updateTask(taskData)
        .then(() => {
            closeModal();
        })
        .catch((err) => {
            console.error(err);
            closeModal();
        });
}
onMounted(() => {
    unmountRef.value = monitorTasksCollection();
});
onUnmounted(() => {
    tasksStore.resetStore();
    if (unmountRef.value) {
        unmountRef.value();
    }
});
</script>

<style scoped lang="scss">
</style>
