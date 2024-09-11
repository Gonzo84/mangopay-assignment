<template>
    <div class="flex flex-col h-screen overflow-hidden bg-white text-gray-600 font-mono">
        <AppHeader></AppHeader>
        <main class="flex-auto overflow-hidden flex flex-col justify-center overflow-y-auto">
            <router-view/>
        </main>
        <AppFooter></AppFooter>
    </div>
</template>

<script setup lang="ts">
import {AppHeader, AppFooter} from "@/views/layouts";

import {monitorAuthStateChange} from "@/services/Auth.service.ts";
import {ref, onMounted, onUnmounted} from "vue";
import {Unsubscribe} from "firebase/auth";

// Reference to the unsubscribe function returned by monitorAuthStateChange
const unsubscribeRef = ref<Unsubscribe | null>(null);

// Lifecycle hook that is called when the component is mounted
onMounted(() => {
    // Start monitoring the authentication state when the component is mounted
    unsubscribeRef.value = monitorAuthStateChange();
});

// Lifecycle hook that is called when the component is unmounted
onUnmounted(() => {
    // Stop monitoring the authentication state when the component is unmounted
    if (unsubscribeRef.value) {
        unsubscribeRef.value();
    }
});
</script>

<style scoped lang="scss">
</style>
