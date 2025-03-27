<script setup lang="ts">
import ProfileFormComponent from "~/components/User/ProfileForm.vue";
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
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <ProfileFormComponent />
  </div>
</template>

<style scoped>
</style>