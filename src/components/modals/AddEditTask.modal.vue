<template>
    <BaseModal @close-modal="onCloseModal">
        <div class="flex-auto flex flex-col p-4">
            <div class="text-lg text-center my-4">{{ taskData!! ? "Edit" : "Add" }} Task</div>

            <form>
                <div class="mb-4">
                    <input type="text" v-model="task.title"
                           placeholder="Title"
                           class="form-input">
                </div>
                <div class="mb-4">
                    <textarea type="text" v-model="task.description"
                              placeholder="Description"
                              class="form-input"></textarea>
                </div>
                <div class="mb-4">
                    <VueTailwindDatepicker input-class="form-input" placeholder="Due Date" v-model="task.dueDate"
                                           as-single :formatter="formatter"></VueTailwindDatepicker>
                </div>
                <div class="mb-6">
                    <select class="form-input" v-model="task.status">
                        <option value="pending">Pending</option>
                        <option value="inProgress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div class="flex flex-row w-full justify-around items-center">
                    <button
                        type="button"
                        class="w-1/3
                       text-gray-600 border-solid border border-gray-600 hover:bg-gray-200 font-semibold p-2
                       rounded-md focus:outline-none"
                        @click="onCloseModal"
                    >
                        Cancel
                    </button>
                    <button @click.prevent="onSave"
                            class="w-1/3	bg-blue-500 hover:bg-blue-600
                       text-white font-semibold p-2
                       rounded-md focus:outline-none">Save
                    </button>
                </div>
            </form>
        </div>
    </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from "@/components/modals/Base.modal.vue";
import {reactive, watch, ref} from "vue";
import {TaskType} from "@/store/tasks.store.ts";
import VueTailwindDatepicker from "vue-tailwind-datepicker";

// Define the events that this component can emit
const emit = defineEmits(["closeModal", "taskAdded", "taskEdited"]);

// Define the props for the component
const props = defineProps<{
    taskData: TaskType | null // The task data to be displayed in the modal
}>()

// Reactive object for the task data
const task = reactive<TaskType>({
    title: props.taskData?.title || '',
    description: props.taskData?.description || '',
    dueDate: props.taskData?.dueDate || '',
    status: props.taskData?.status || 'pending',
    id: props.taskData?.id || '',
})

// Formatter for the datepicker
const formatter = ref({
    date: 'DD MMM YYYY',
    month: 'MMM',
})

// Method to emit the 'closeModal' event and close the modal
const onCloseModal = () => {
    emit('closeModal', false) // Emit the 'closeModal' event with false
}

// Method to save the task data
const onSave = () => {
    props.taskData ? editTask() : addNewTask() // If task data is present, edit the task, otherwise add a new task
}

// Method to emit the 'taskAdded' event with the task data
const addNewTask = () => {
    emit('taskAdded', task) // Emit the 'taskAdded' event with the task data
}

// Method to emit the 'taskEdited' event with the task data
const editTask = () => {
    emit('taskEdited', task) // Emit the 'taskEdited' event with the task data
}

// Watcher to update the task data when the prop changes
watch(() => props.taskData, (newVal) => {
    task.title = newVal?.title || ''
    task.description = newVal?.description || ''
    task.dueDate = newVal?.dueDate || ''
    task.status = newVal?.status || 'pending'
    task.id = newVal?.id || ''
})
</script>

<style scoped lang="scss">
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
</style>