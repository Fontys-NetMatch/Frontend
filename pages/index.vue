<script setup lang="ts">
    definePageMeta({
        middleware: 'auth',
    });

    const event = useRequestEvent();
    console.log(event);

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