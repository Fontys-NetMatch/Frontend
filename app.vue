<template>
  <NuxtLayout>
    <v-app>
      <NavBar />
      <v-main>
        <NuxtPage />
      </v-main>
    </v-app>
  </NuxtLayout>
</template>

<script setup lang="ts">
import NavBar from '~/components/navbar.vue';
</script>
