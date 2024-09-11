<template>
  <Teleport to="#modals">
    <!-- The backdrop -->
    <div class="fixed inset-0 bg-gray-900 opacity-40"></div>


    <div class="fixed inset-0 flex items-center justify-center">
      <div class="bg-white text-gray-600 rounded-lg p-4 w-full max-w-md relative modal-animation font-mono">
        <div class="absolute top-0 right-2 text-gray-600 hover:text-gray-700 cursor-pointer text-2xl" @click="handleCloseModal"><font-awesome-icon icon="xmark" /></div>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
const emit = defineEmits(["closeModal"]),
    handleCloseModal = () => {
      emit('closeModal')
    }
</script>
<style scoped lang="scss">

@keyframes animation {
  from {
    opacity: 0;
    transform: translate(-50%, -100%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -70%);
  }
}

.modal-animation {
  animation: 0.3s animation;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
}
</style>