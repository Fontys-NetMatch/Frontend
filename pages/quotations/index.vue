<script setup lang="ts">
import DashboardForm from "~/components/quotation/DashboardForm.vue";
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
  <DashboardForm />
</template>


<style scoped>
</style>