<script setup lang="ts">
    import LoginForm from "~/components/auth/LoginForm.vue";
    import {watchEffect} from "vue";
    import {useAuthStore} from "~/store/auth";

    watchEffect(() => {
        const authStore = useAuthStore();
        console.log(authStore);
        if (authStore.jwtToken !== undefined) {
            navigateTo("/");
        }
    });

    useSeoMeta({
        title: "Login"
    });
</script>

<template>
    <LoginForm />
</template>

<style scoped>

</style>