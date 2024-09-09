<template>
    <div class="container bg-white p-8">
        <h2 class="text-3xl font-bold text-center mb-6">Sign In</h2>
        <form>
            <div class="mb-4">
                <input type="email" v-model="credentials.email"
                       placeholder="Email"
                       class="form-input"
                       required>
            </div>
            <div class="mb-4">
                <input type="password" v-model="credentials.password"
                       placeholder="Password"
                       class="form-input"
                       required>
            </div>
            <button @click.prevent="signIn"
                    class="w-full bg-blue-500 hover:bg-blue-600
                       text-white font-semibold py-2
                       rounded-md focus:outline-none">Sign
                In
            </button>
        </form>
        <div class="py-4 text-sm text-red-800">{{ error }}</div>
        <p class=" mt-4 text-sm text-center
                  text-gray-600">Don't have an account?
            <router-link class="text-blue-500 hover:underline" :to="{name: 'SignUp'}"> Sign up here</router-link>
        </p>
    </div>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue'
import {loginWithEmailAndPassword, UserCredentials} from "@/services/Auth.service.ts";

const credentials = reactive<UserCredentials>({
    email: '',
    password: ''
})
const error = ref<string | null>(null)

const signIn = () => {
    if (credentials.email.trim() === "" ||
        credentials.password.trim() === "") {
        error.value = 'Please fill in all fields.'
        return;
    }
    loginWithEmailAndPassword(credentials)
        .then(() => {
            // Signed up
            error.value = null
        })
        .catch((err) => {
            error.value = err.message
        });
}
</script>
<style scoped lang="scss">
.container {
    max-width: 400px;
    border: 2px solid rgb(0, 0, 0);
    border-radius: 8px;
    padding: 20px;


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
}
</style>