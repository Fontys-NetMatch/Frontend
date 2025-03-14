<script setup lang="ts">
    import { useAuthStore } from "~/store/auth";

    const authStore = useAuthStore()

    console.log("temp", authStore.user);
</script>

<template>
    <UAlert
        icon="i-heroicons-command-line"
        color="red"
        variant="subtle"
        title="Heads up!"
        description="You can add components to your app using the cli."
    />
</template>