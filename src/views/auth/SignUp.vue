<template>
    <div class="container bg-white p-8">
        <h2 class="text-3xl font-bold text-center mb-6">Sign Up</h2>
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
            <div class="mb-6">
                <input type="password"
                       v-model="credentials.confirmPassword"
                       placeholder="Confirm Password"
                       class="form-input"
                       required>
            </div>
            <button @click.prevent="register"
                    class="w-full bg-blue-500 hover:bg-blue-600
                       text-white font-semibold py-2
                       rounded-md focus:outline-none">Sign
                Up
            </button>
        </form>
        <div class="py-4 text-sm text-red-800">{{ error }}</div>
        <p class=" mt-4 text-sm text-center
                  text-gray-600">Already have
            an account?
            <router-link class="text-blue-500 hover:underline" :to="{name: 'SignIn'}"> Sign in here</router-link>
        </p>
    </div>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue'
import {signUpWithEmailAndPassword, UserCredentials} from "@/services/Auth.service.ts";

type RegisterCredentials = UserCredentials & { confirmPassword: string };

const credentials = reactive<RegisterCredentials>({
    email: '',
    password: '',
    confirmPassword: ''
})
const error = ref<string | null>(null)

const register = () => {
    if (credentials.email.trim() === "" ||
        credentials.password.trim() === "" || credentials.confirmPassword.trim() === "") {
        error.value = 'Please fill in all fields.'
        return;
    }
    if (credentials.password !== credentials.confirmPassword) {
        error.value = 'Passwords do not match.'
        return;
    }
    signUpWithEmailAndPassword(credentials)
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