<template>
    <div
        class="kanban-card bg-gray-100 rounded-lg shadow p-3 mb-2 cursor-pointer"
        @click="editTask">
        <h3 class="text-center text-2xl mb-2">{{ taskData.title }}</h3>
        <p class="mb-2">{{ taskData.description }}</p>
        <p class="mb-2">Status: <span :class="taskData.status">{{ taskData.status }}</span></p>
        <p class="mb-4">Due Date: {{ taskData.dueDate }}</p>
        <div class="flex flex-row justify-end w-full">
            <button
                type="button"
                class="text-gray-500 hover:text-gray-700 font-semibold p-2 focus:outline-none mr-2"
                @click.stop="editTask">
                <font-awesome-icon icon="pen"/>
            </button>

            <button
                type="button"
                class="text-gray-500 hover:text-gray-700 font-semibold p-2 focus:outline-none"
                @click.stop="deleteTask">
                <font-awesome-icon icon="trash"/>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {TaskType} from "@/store/tasks.store.js";

const props = defineProps<{
    taskData: TaskType
}>()

const emit = defineEmits(["delete-task", "edit-task"]);

const deleteTask = () => {
    emit('delete-task', props.taskData);
};

const editTask = () => {
    emit('edit-task', props.taskData);
};
</script>
<style scoped lang="scss">
.completed {
    color: green;
}

.inProgress {
    color: orange;
}

.pending {
    color: red;
}
</style>