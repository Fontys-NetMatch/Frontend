<template>
    <NuxtLayout>
        <v-app>
            <NavBar/>
            <v-main>
                <NuxtPage/>
            </v-main>
            <Toast/>
        </v-app>
    </NuxtLayout>
</template>

<script setup lang="ts">
import NavBar from '~/components/Layout/NavBar.vue';
import 'vue3-toastify/dist/index.css'
import Toast from "~/components/Toast.vue";
</script>
