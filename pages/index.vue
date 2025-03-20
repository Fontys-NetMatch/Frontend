<script setup lang="ts">
    definePageMeta({
        middleware: 'auth',
    });
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