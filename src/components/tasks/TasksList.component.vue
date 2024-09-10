<template>
    <template v-if="getAllTasks && getAllTasks.length">
        <div class="bg-white p-4 md:p-8 flex flex-col w-full max-w-3xl">
            <transition-group name="list">
                <TaskCard v-for="task in getAllTasks" :key="task.id" :task-data="task" @delete-task="onTaskDelete"
                          @edit-task="onTaskEdit">
                </TaskCard>
            </transition-group>
        </div>
    </template>
    <template v-else>
        <div>No tasks are currently available. Create the new task</div>
    </template>
    <ConfirmDelete v-if="showModal" :task-data="modalData" @close-modal="showModal = false"
                   @delete-confirmed="onDeleteConfirmed"></ConfirmDelete>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import useTasksStore, {TaskType} from "@/store/tasks.store.ts";
import TaskCard from "@/components/tasks/TaskCard.component.vue";
import ConfirmDelete from "@/components/modals/ConfirmDelete.modal.vue";
import {ref, Ref} from "vue";

const emit = defineEmits(["edit-task", "delete-task"]);

const tasksStore = useTasksStore();
const {getAllTasks} = storeToRefs(tasksStore);
const showModal = ref(false)
let modalData: Ref<TaskType | null> = ref(null);
const onTaskDelete = (taskData: TaskType) => {
    showModal.value = true;
    modalData.value = taskData;
}
const onDeleteConfirmed = () => {
    emit('delete-task', modalData.value);
    showModal.value = false;
    modalData.value = null;
}
const onTaskEdit = (taskData: TaskType) => {
    emit('edit-task', taskData);
}

</script>
<style scoped lang="scss">
.list-enter-active, .list-leave-active {
    transition: all .3s;
}

.list-enter-from, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.list-enter-to, .list-leave-from {
    opacity: 1;
    transform: translateY(0);
}

</style>