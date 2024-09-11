<template>
    <template v-if="getAllTasks && getAllTasks.length">
        <div class="bg-white p-4 md:p-8 flex flex-col w-full max-w-3xl">
            <div class="mb-4">
                <input type="search" v-model="filterByText"
                       placeholder="Filter tasks by title or description"
                       class="form-input">
            </div>
            <div class="mb-4 flex flex-row items-center">
                <div class="flex-auto flex flex-row items-center gap-2">
                    <p v-for="(status, index) in statuses" :key="index">
          <span
              @click="filterByStatus(status)"
              :class="{ active: status === activeStatusFilter }"
              class="cursor-pointer p-2"
          >{{ status }}</span
          >
                    </p>
                </div>
                <div class="cursor-pointer p-2" v-if="sortOrder === 'asc'" @click="toggleSortOrder"><font-awesome-icon icon="arrow-down-1-9"/></div>
                <div class="cursor-pointer p-2" v-else @click="toggleSortOrder"><font-awesome-icon icon="arrow-up-1-9"/></div>
            </div>
            <transition-group name="list">
                <TaskCard v-for="task in sortedTasks" :key="task.id" :task-data="task" @delete-task="onTaskDelete"
                          @edit-task="onTaskEdit">
                </TaskCard>
            </transition-group>
        </div>
    </template>
    <template v-else>
        <div>No tasks are currently available. Create a new task</div>
    </template>
    <ConfirmDelete v-if="showModal" :task-data="modalData" @close-modal="showModal = false"
                   @delete-confirmed="onDeleteConfirmed"></ConfirmDelete>
</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import useTasksStore, {TaskType, STATUS_MAP} from "@/store/tasks.store.ts";
import TaskCard from "@/components/tasks/TaskCard.component.vue";
import ConfirmDelete from "@/components/modals/ConfirmDelete.modal.vue";
import {ref, Ref, computed} from "vue";

const emit = defineEmits(["edit-task", "delete-task"]);

const tasksStore = useTasksStore();
const {getAllTasks} = storeToRefs(tasksStore);
const showModal = ref(false)
const filterByText = ref('')
const sortOrder = ref('asc'); // 'asc' for ascending, 'desc' for descending
const statuses = ref(['All', 'Pending', 'In Progress', 'Completed'])
const activeStatusFilter = ref('All');
let modalData: Ref<TaskType | null> = ref(null);

const allTasks = computed(() => {
    return getAllTasks.value.filter((task: TaskType) => {
        const filteredTasks = task.title.toLowerCase().includes(filterByText.value.toLowerCase()) ||
            task.description.toLowerCase().includes(filterByText.value.toLowerCase())
        return filteredTasks && (activeStatusFilter.value === 'All' || STATUS_MAP[task.status] === activeStatusFilter.value)
    })
})
const sortedTasks = computed(() => {
    const sorted = [...allTasks.value];
    sorted.sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return sortOrder.value === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
    return sorted;
});

const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
}

const filterByStatus = (status: string) => {
    activeStatusFilter.value = status;
}
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

.form-input {
    transition: border-color 0.3s ease;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    width: 100%;
    margin-bottom: 10px;

    &:focus {
        border-color: #4f46e5;
        outline: none;
    }
}

.active {
    background: #5e8df7;
    color: #fff;
    border-radius: 4px;
}
</style>