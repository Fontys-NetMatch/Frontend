<script setup lang="ts">
    import RegisterForm from "~/components/auth/RegisterForm.vue";
    import {watchEffect} from "vue";
    import {useAuthStore} from "~/store/auth";

    // Redirect to home page if user is already logged in
    watchEffect(() => {
        const authStore = useAuthStore();
        if (authStore.jwtToken !== undefined) {
            navigateTo("/");
        }
    });

    useSeoMeta({
        title: "Login"
    });
</script>

<template>
    <RegisterForm />
</template>

<style scoped>

</style>