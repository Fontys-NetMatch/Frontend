import { defineNuxtConfig } from 'nuxt/config';
import * as process from "node:process";

export default defineNuxtConfig({
    // Remove or correct the serverDir if unnecessary
    $development: undefined,
    $env: undefined,
    $meta: undefined,
    $production: undefined,
    $test: undefined,

    css: [
        'bootstrap/dist/css/bootstrap.min.css'
    ],

    ssr: false,

    modules: [
        'vuetify-nuxt-module',
        '@nuxt/image',
        '@nuxtjs/i18n',
        '@nuxt/icon',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        'nuxt-time',
    ],

    vuetify: {
        vuetifyOptions: {
            // Add your Vuetify options here if any
        }
    },

    icon: {
        serverBundle: {
            collections: ['uil', 'mdi'], // <-- this part is fine
        }
    },

    i18n: {
        vueI18n: './i18n.config.ts'
    },

    runtimeConfig: {
        public: {
            backendBaseUrl: process.env.BACKEND_BASE_URL,
        }
    },

    build: {
        transpile: ['vuetify'],
    },

    compatibilityDate: '2025-03-28',
});