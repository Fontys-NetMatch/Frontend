import {defineNuxtConfig} from 'nuxt/config';

export default defineNuxtConfig({
    ssr: false,

    modules: [
      'vuetify-nuxt-module',
      '@nuxt/image',
      '@nuxtjs/i18n',
      '@nuxt/icon',
      '@pinia/nuxt',
      'pinia-plugin-persistedstate/nuxt',
      '@nuxtjs/tailwindcss',
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
            {code: 'en', name: 'English'},
            {code: 'fr', name: 'Français'},
            {code: 'nl', name: 'Nederlands'},
            {code: 'de', name: 'Deutsch'}
        ],
        defaultLocale: 'en',
    },

    runtimeConfig: {
        public: {
            backendBaseUrl: process.env.BACKEND_BASE_URL,
        }
    },

    build: {
        transpile: ['vuetify'],
    },

    compatibilityDate: '2025-03-14',


});