<template>
    <v-app-bar app color="primary" dark>
      <!-- App Title -->
      <v-toolbar-title>Travel planner</v-toolbar-title>
  
      <!-- Navigation Links -->
      <v-btn v-for="item in navigationItems" :key="item.to" :to="item.to" variant="text" class="text-white">
        {{ item.label }}
      </v-btn>
  
      <v-spacer></v-spacer> <!-- Pushes Sign Out button to the right -->
  
      <!-- Sign Out Button -->
      <v-btn color="red" class="text-black font-weight-bold" variant="flat" @click="signOut">
        Sign Out
      </v-btn>
    </v-app-bar>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const navigationItems = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/product/dashboard' },
    { label: 'Quotations', to: '/quotations/dashboard'},
    { label: 'Login Page', to: '/auth/login' }
  ];
  
  const signOut = () => {
    alert('Signing out...'); // Replace with actual sign-out logic
  };
  </script>
  