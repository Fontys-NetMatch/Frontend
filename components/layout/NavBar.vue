<template>
  <v-app-bar app color="primary" dark>
        <NuxtImg src="assets/images/logo.png" alt="Logo" width="40" height="40" class="ml-3"/>
    <span class="NavBarTitle" >Travel planner</span>


  <v-spacer></v-spacer>
        <v-spacer></v-spacer>

      <v-container class="d-flex justify-center align-">
      <!-- v-if="authStore.jwtToken != undefined" , TEMPORARY,-->
        <v-btn
            v-for="item in navigationItems"
            :key="item.to"
            :to="item.to"
            variant="text"
            class="text-white"
        >
          {{ item.label }}
        </v-btn>
      </v-container>

        <v-spacer></v-spacer>

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
            <v-tooltip bottom>
              <template v-slot:activator="{ props }">
                <v-btn class="flag-btn" v-bind="props">
                  <NuxtImg
                      :src="lang.flag"
                      :alt="lang.name"
                      width="30"
                      height="20"
                      class="flag-img"
                      fit="contain"
                  />
                </v-btn>
              </template>
              <span>{{ lang.name }}</span>
            </v-tooltip>
          </v-list-item>
        </v-list>
      </v-menu>

        <template v-if="authStore.jwtToken != undefined">
          <v-btn to="/user/profile" class="profile-btn ml-3" variant="text" v-ripple="false">
            <NuxtImg src="assets/images/profile.jpg" alt="Profile" width="40" height="40" class="rounded-circle profile-img" />
          </v-btn>
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
import { useNavbar } from '~/store/useNavbar';
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore();

const {
  navigationItems,
  signIn,
  signOut,
  languages,
  selectedLanguage,
  changeLanguage,
} = useNavbar();
</script>

<style>

.language-list {
  background-color: transparent !important; /* Make the background transparent */
  box-shadow: none !important; /* Remove any shadow */
  border: none !important; /* Remove any border */
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

.profile-btn .v-btn__overlay,
.profile-btn .v-btn__underlay {
  display: none !important;
}
.NavBarTitle {
  display: inline-block;
  width: 200px; /* Set your desired width */
}
</style>