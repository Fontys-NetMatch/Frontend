import {defineNuxtConfig} from 'nuxt/config';

export default defineNuxtConfig({
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
        // Vuetify-specific options
        vuetifyOptions: {
            // Add your Vuetify options here
        }
    },

    icon: {
        serverBundle: {
            collections: ['uil', 'mdi'] // <!--- this
        }
    },

    i18n: {
        locales: [
            { code: 'en', name: 'English' },
            { code: 'fr', name: 'Français' },
            { code: 'nl', name: 'Nederlands' },
            { code: 'de', name: 'Deutsch' },
        ],
        defaultLocale: 'en',
        strategy: 'prefix_and_default', // URL structure: /en, /fr, /nl, /de
        vueI18n: './i18n.config.ts', // Use TypeScript config file instead of JSON
        lazy: true,
    },

    runtimeConfig: {
        public: {
            backendBaseUrl: process.env.BACKEND_BASE_URL,
        }
    },

    build: {
        transpile: ['vuetify', 'vue-i18n'],
    },

    compatibilityDate: '2025-03-28',
});