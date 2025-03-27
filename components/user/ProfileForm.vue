<script setup lang="ts">
import { ref, onMounted } from 'vue';

const profile = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: "/assets/images/profile.jpg"
});

</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="text-center p-4 border rounded shadow bg-white">
      <!-- Avatar -->
      <img
          :src="profile.avatar"
          :alt="`${profile.name}'s avatar`"
          class="mx-auto d-block mb-3 rounded-circle border border-dark"
          style="width: 200px; height: 200px;"
      >

      <!-- Name -->
      <h1 class="h4 fw-bold text-dark mb-2">
        {{ profile.name }}
      </h1>

      <!-- Email -->
      <p class="text-muted">
        {{ profile.email }}
      </p>
    </div>
  </div>
</template>

<style scoped>
</style>