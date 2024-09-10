<template>
    <BaseModal v-if="show" :show="show" @close-modal="onCloseModal">
        <div class="flex-auto flex flex-col p-4">
            <div class="text-center my-4 text-2xl">Please confirm action</div>
            <div class="mb-6">Are you sure that you want to delete task with the title "<span
                class="font-bold text-center text-gray-700">{{ taskData?.title }}</span>"
            </div>

            <div class="flex flex-row w-full justify-around items-center">
                <button
                    type="button"
                    class="w-1/3
                       text-black border-solid border border-gray-600 hover:bg-gray-200 font-semibold p-2
                       rounded-md focus:outline-none"
                    @click="onCloseModal"
                >
                    Cancel
                </button>
                <button @click.prevent="onDelete"
                        class="w-1/3	bg-red-600 hover:bg-red-700
                       text-white font-semibold p-2
                       rounded-md focus:outline-none">Delete
                </button>
            </div>
        </div>
    </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from "@/components/modals/Base.modal.vue";
import {TaskType} from "@/store/tasks.store.ts";

const emit = defineEmits(["closeModal", "deleteConfirmed"]);
const {taskData} = defineProps<{
    show: boolean,
    taskData: TaskType | null
}>()
const onCloseModal = () => {
    emit('closeModal', false)
}
const onDelete = () => {
    emit('deleteConfirmed')
    onCloseModal()
}
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