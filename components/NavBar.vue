<template>
  <v-app-bar app color="primary" dark>
    <!-- Logo on the Left -->
    <NuxtImg src="assets/images/logo.png" alt="Logo" width="40" height="40" class="ml-3" />

    <!-- App Title -->
    <v-toolbar-title class="ml-3">Travel Planner</v-toolbar-title>

    <!-- Navigation Links -->
    <v-btn v-for="item in navigationItems" :key="item.to" :to="item.to" variant="text" class="text-white">
      {{ item.label }}
    </v-btn>

    <v-spacer></v-spacer> <!-- Pushes Profile Image + Sign Out button to the right -->

    <!-- Profile Image on the Right -->
    <NuxtImg src="assets/images/profile.jpg" alt="Profile" width="40" height="40" class="rounded-circle" />

    <!-- Sign Out Button -->
    <v-btn color="red" class="text-black font-weight-bold ml-3" variant="flat" @click="signOut">
      Sign Out
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const navigationItems = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/product/dashboard' },
  { label: 'Quotations', to: '/quotations/dashboard' },
  { label: 'Login Page', to: '/auth/login' }
];

const signOut = () => {
  alert('Signing out...'); // Replace with actual sign-out logic
};
</script>
