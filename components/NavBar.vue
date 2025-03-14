<template>
  <v-app-bar app color="primary" dark>
    <!-- Logo on the Left -->
    <NuxtImg src="assets/images/logo.png" alt="Logo" width="40" height="40" class="ml-3" />

    <!-- App Title -->
    <v-toolbar-title class="ml-3">Travel Planner</v-toolbar-title>

    <!-- Navigation Links -->
    <v-btn v-for="item in navigationItems" :key="item.to" :to="item.to" variant="text" class="text-white">
      {{ item.label }}
    </v-btn>

    <v-spacer></v-spacer> <!-- Pushes elements to the right -->

    <!-- Language Selector Dropdown -->
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" class="flag-btn">
          <NuxtImg
            :src="selectedLanguage.flag"
            :alt="selectedLanguage.name"
            width="30"
            height="20"
            class="flag-img"
            fit="contain"
          />
        </v-btn>
      </template>

      <v-list class="language-list">
        <v-list-item
          v-for="lang in languages"
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          class="flag-item"
        >
          <v-btn class="flag-btn">
            <NuxtImg
              :src="lang.flag"
              :alt="lang.name"
              width="30"
              height="20"
              class="flag-img"
              fit="contain"
            />
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Profile Image (Right) -->
    <v-btn to="/user/profile" class="profile-btn ml-3" variant="text" v-ripple="false">
  <NuxtImg src="assets/images/profile.jpg" alt="Profile" width="40" height="40" class="rounded-circle profile-img" />
</v-btn>

    <!-- Sign Out Button -->
    <v-btn color="red" class="text-black font-weight-bold ml-3" variant="flat" @click="signOut">
      Sign Out
    </v-btn>
  </v-app-bar>
</template>



<script setup lang="ts">
import { ref } from 'vue';

const navigationItems = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/product/dashboard' },
  { label: 'Quotations', to: '/quotations/dashboard' },
  { label: 'Login Page', to: '/auth/login' }
];

const signOut = () => {
  alert('Signing out...'); // Replace with actual sign-out logic
};

const { locale } = useI18n(); // Get current locale

// Language options
const languages = ref([
  { code: 'en', name: 'English', flag: 'assets/images/flags/en.png' },
  { code: 'fr', name: 'France', flag: 'assets/images/flags/fr.png' },
  { code: 'de', name: 'Deutsch', flag: 'assets/images/flags/de.png' },
  { code: 'nl', name: 'Nederlands', flag: 'assets/images/flags/nl.png' },
]);

// Default selected language (syncs with locale)
const selectedLanguage = ref(languages.value.find(lang => lang.code === locale.value) || languages.value[0]);

// Change language function
const changeLanguage = (langCode: string) => {
  locale.value = langCode as typeof locale.value;
  selectedLanguage.value = languages.value.find(lang => lang.code === langCode) || languages.value[0];
};


</script>

<style>

.language-list {
  background-color: transparent !important; /* Make the background transparent */
  box-shadow: none !important; /* Remove any shadow */
  border: none !important; /* Remove any border */
}

.v-list-item {
  background: transparent !important; /* Removes the white background */
  padding: 0 !important; /* Removes padding */
}
.flag-btn {
  background-color: transparent !important; /* Remove button background */
  box-shadow: none !important; /* Remove shadow */
  border: none !important; /* Remove border */
}

.flag-btn .v-btn__overlay,
.flag-btn .v-btn__underlay {
  display: none !important; /* Hide any overlay effects */
}

.flag-btn .v-btn__content {
  padding: 0 !important; /* Remove unnecessary padding */
}

.flag-img {
  object-fit: contain; /* Ensures the image retains aspect ratio */
  display: block; /* Prevents inline spacing issues */
  width: 60px !important; /* Ensures consistent width */
  height: 40px !important; /* Ensures consistent height */
}
.v-ripple__container {
  display: none !important;
}

.profile-btn {
  outline: none !important;
  box-shadow: none !important;
  background-color: transparent !important;
}

.profile-btn:focus,
.profile-btn:active {
  outline: none !important;
  box-shadow: none !important;
  background-color: transparent !important;
}

.profile-btn .v-btn__overlay,
.profile-btn .v-btn__underlay {
  display: none !important;
}

</style>