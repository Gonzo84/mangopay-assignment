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

const emit = defineEmits(["closeModal", "taskAdded", "taskEdited"]);
const props = defineProps<{
    taskData: TaskType | null
}>()
const task = reactive<TaskType>({
    title: props.taskData?.title || '',
    description: props.taskData?.description || '',
    dueDate: props.taskData?.dueDate || '',
    status: props.taskData?.status || 'pending',
    id: props.taskData?.id || '',
})
const formatter = ref({
    date: 'DD MMM YYYY',
    month: 'MMM',
})
const onCloseModal = () => {
    emit('closeModal', false)
}
const onSave = () => {
    props.taskData ? editTask() : addNewTask()
}
const addNewTask = () => {
    emit('taskAdded', task)
}
const editTask = () => {
    emit('taskEdited', task)
}
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