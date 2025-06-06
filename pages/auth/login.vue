<script setup lang="ts">
    import LoginForm from "~/components/auth/LoginForm.vue";
    import {watchEffect} from "vue";
    import {useAuthStore} from "~/store/auth";
    import { useI18n } from 'vue-i18n';
    const { t } = useI18n();
    // Redirect to home page if user is already logged in
    watchEffect(() => {
        const authStore = useAuthStore();
        if (authStore.jwtToken !== undefined) {
            navigateTo("/");
        }
    });

    useSeoMeta({
        title: t('Login')
    });
</script>

<template>
    <LoginForm />
</template>

<style scoped>

</style>