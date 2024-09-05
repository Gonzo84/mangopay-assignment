<template>
    <div class="flex flex-col h-screen overflow-hidden bg-white">
        <AppHeader></AppHeader>
        <main class="flex-1 overflow-y-scroll">
            <router-view/>
        </main>
        <AppFooter></AppFooter>
    </div>
</template>

<script setup lang="ts">
import {AppHeader, AppFooter} from "./views/layouts";
</script>

<style scoped>
</style>
