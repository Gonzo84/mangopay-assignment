<template>
    <header class="w-full text-center border-b border-grey p-2 md:p-4 text-gray-600 font-mono">
        <nav class="w-full flex items-center justify-center relative">
            <template v-if="user">
                <div class="mx-4">Welcome, {{ user.email }}</div>
                <button class="absolute top-0 right-0 hover:text-blue-600 hidden md:block" @click="logOut">Sign out
                </button>
                <font-awesome-icon class="absolute top-0 right-0 hover:text-blue-600  md:hidden"
                                   icon="arrow-right-from-bracket" @click="logOut"/>
            </template>
            <template v-if="!user">
                <router-link activeClass="active-link text-blue-500" class="mx-4 hover:text-blue-600"
                             :to="{name: 'SignIn'}">Sign In
                </router-link>
                |
                <router-link activeClass="active-link text-blue-500" class="mx-4 hover:text-blue-600"
                             :to="{name: 'SignUp'}">Sign Up
                </router-link>
            </template>
        </nav>
    </header>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {logOut} from "@/services/Auth.service.ts";
import useUserStore from "@/store/user.store.ts";

const userStore = useUserStore()

const user = computed(() => {
    return userStore.getUser;
})
</script>

<style scoped lang="scss">
.active-link {
    text-shadow: 0 0 0.01px rgb(59 130 246);
}
</style>
