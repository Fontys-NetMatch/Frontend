<script setup lang="ts">
    definePageMeta({
        middleware: 'auth',
    });
    import {useNavbar} from "~/store/useNavbar";
    const { navigationItems, signIn, signOut } = useNavbar();

</script>

<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-row class="text-center" justify="center" align="center">
      <v-col
          v-for="(item, index) in navigationItems"
          :key="index"
          cols="auto"
      >
        <v-btn :to="item.to" color="primary" large>
          {{ item.label }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>