<template>
    <div class="flex flex-col h-screen overflow-hidden bg-white">
        <AppHeader></AppHeader>
        <main class="flex-auto overflow-hidden flex items-center justify-center">
            <router-view/>
        </main>
        <AppFooter></AppFooter>
    </div>
</template>

<script setup lang="ts">
import {AppHeader, AppFooter} from "@/views/layouts";

import {monitorAuthStateChange} from "@/services/Auth.service.ts";


monitorAuthStateChange();
</script>

<style scoped lang="scss">
</style>
