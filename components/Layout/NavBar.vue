<template>
    <v-app-bar app color="primary" dark>
        <NuxtImg src="assets/images/logo.png" alt="Logo" width="40" height="40" class="ml-3"/>
        <v-toolbar-title class="ml-3">Travel Planner</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn v-if="authStore.jwtToken != undefined" v-for="item in navigationItems" :key="item.to" :to="item.to" variant="text" class="text-white">
            {{ item.label }}
        </v-btn>

        <v-spacer></v-spacer>

        <template v-if="authStore.jwtToken != undefined">
            <NuxtImg src="assets/images/profile.jpg" alt="Profile" width="40" height="40" class="rounded-circle"/>
            <v-btn color="red" class="text-black font-weight-bold ml-3" variant="flat" @click="signOut">
                Sign Out
            </v-btn>
        </template>
        <template v-else>
            <v-btn color="red" class="text-black font-weight-bold ml-3" variant="flat" @click="signIn">
                Sign In
            </v-btn>
        </template>

    </v-app-bar>
</template>

<script setup lang="ts">
import {useAuthStore} from "~/store/auth";

const authStore = useAuthStore();

let navigationItems = [
    {label: 'Home', to: '/'},
    {label: 'Products', to: '/product/dashboard'},
    {label: 'Quotations', to: '/quotations/dashboard'}
];

const signIn = () => {
    navigateTo("/auth/login");
}
const signOut = () => {
    authStore.logout();
    navigateTo("/auth/login");
};
</script>
