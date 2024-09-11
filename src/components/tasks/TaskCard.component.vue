<template>
    <div
        class="kanban-card bg-gray-100 rounded-lg shadow p-4 mb-4 cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all duration-150"
        @click="editTask">
        <div class="mb-2 flex flex-row justify-center items-center relative">
            <h3 class="text-center text-xl">{{ taskData.title }}</h3>
            <div class="absolute top-0 right-0 rounded-lg p-2 text-white font-semibold" :class="taskData.status">{{ STATUS_MAP[taskData.status] }}</div>
        </div>
        <p class="mb-2 min-h-20">{{ taskData.description }}</p>
        <div class="flex flex-row justify-end w-full">
            <div class="flex-auto flex items-center">Due Date: {{ taskData.dueDate }}</div>
            <button
                type="button"
                class="text-blue-500 hover:text-blue-600 font-semibold focus:outline-none mr-8"
                @click.stop="editTask">
                <font-awesome-icon icon="pen"/>
            </button>

            <button
                type="button"
                class="text-red-500 hover:text-red-600 font-semibold focus:outline-none"
                @click.stop="deleteTask">
                <font-awesome-icon icon="trash"/>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {TaskType, STATUS_MAP} from "@/store/tasks.store.js";

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
    background: rgba(green, 0.7);
}

.inProgress {
    background: rgba(orange, 0.7);
}

.pending {
    background: rgba(red, 0.7);
}
</style>