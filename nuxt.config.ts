import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  modules: [
    'vuetify-nuxt-module',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxt/icon',
    'nuxt-auth-utils',
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
      { code: 'nl', name: 'Nederlands'},
      { code: 'de', name: 'Deutsch'}
    ],
    defaultLocale: 'en',
  },

  runtimeConfig: {
    oauth: {
      // provider in lowercase (github, google, etc.)
      //<provider>: {
        //clientId: '...',
        //clientSecret: '...'
    //  }
    }
  },


  build: {
    transpile: ['vuetify'],
  },

  compatibilityDate: '2025-03-14',
});