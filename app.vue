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
import 'vue3-toastify/dist/index.css'
import NavBar from '~/components/layout/NavBar.vue';
import Toast from "~/components/Toast.vue";
</script>
