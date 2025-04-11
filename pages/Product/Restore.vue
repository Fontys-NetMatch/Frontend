<script setup lang="ts">
import RestoreProductForm from "~/components/product/RestoreProductForm.vue";
import { watchEffect } from "vue";
import { useAuthStore } from "~/store/auth";

watchEffect(() => {
  const authStore = useAuthStore();
  if (!authStore.jwtToken) {
    navigateTo("/auth/login");
  }
});

</script>

<template>
  <RestoreProductForm />
</template>

<style scoped>
</style>