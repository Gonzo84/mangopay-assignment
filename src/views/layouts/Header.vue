<template>
    <header class="w-full text-center border-b border-grey p-4">
        <nav class="w-full flex items-center justify-center relative">
            <template v-if="user">
                <div class="m-4">Welcome, {{ user.email }}</div>
                <button class="m-4 absolute top-0 right-0" @click="logOut">Sign out</button>
            </template>
            <template v-if="!user">
                <router-link activeClass="active-link" class="m-4" :to="{name: 'SignIn'}">Sign In</router-link>
                |
                <router-link activeClass="active-link" class="m-4" :to="{name: 'SignUp'}">Sign Up</router-link>
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
    color: rgb(59 130 246);
    text-shadow: 0 0 0.01px rgb(59 130 246);
}
</style>
