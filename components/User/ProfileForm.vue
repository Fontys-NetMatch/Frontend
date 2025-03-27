<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Simulated profile data (replace with API call in a real app)
const profile = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
});
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="text-center">
      <!-- Avatar -->
      <img
          :src="profile.avatar"
          :alt="`${profile.name}'s avatar`"
          class="mx-auto w-[200px] h-[200px] rounded-xl border-8"

      >
      <!-- Name -->
      <h1 class="text-2xl font-bold text-gray-800 mb-2">
        {{ profile.name }}
      </h1>
      <!-- Email -->
      <p class="text-gray-600 mb-2">
        {{ profile.email }}
      </p>
    </div>
  </div>
</template>


<style scoped>

</style>