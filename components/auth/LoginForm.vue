<script setup lang="ts">
    import { ref } from 'vue'
    import { useAuthStore } from "~/store/auth";
    import { useI18n } from 'vue-i18n';
    import {useLocaleRoute} from "#i18n";
    const { t } = useI18n({ useScope: 'global' });

    const authStore = useAuthStore();
    const localeRoute = useLocaleRoute()

    let loading = ref(false);
    let email = ref("mail@example.com");
    let password = ref("1234");
    let rememberMe = ref(false);
    let showPassword = ref(false);

    let rules = {
        required: value => !!value || 'Required.',
        email: v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    };

    function validateFormSubmit(): boolean {
        let valid = true;
        if(!rules.required(email.value)) {
            valid = false;
        }
        if(!rules.email(email.value)) {
            valid = false;
        }
        if(!rules.required(password.value)) {
            valid = false;
        }
        return valid;
    }

    function submitForm(): void {
        // Only block the request. Vuetify is handeling the messages
        if(!validateFormSubmit()) return;

        loading.value = true;
        authStore.login(
            email.value,
            password.value,
            rememberMe.value,
            (user, jwtToken) => {
                loading.value = false;
                if(!user) return;
                navigateTo("/");
            },
            (error) => {
                loading.value = false;
            }
        );
    }

</script>

<template>
    <div class="flex justify-center align-content-center h-100">
        <v-card class="mx-auto mb-10" max-width="400">
            <v-sheet class="ma-4">
                <v-form validate-on="submit lazy" @submit.prevent="submitForm">
                    <h1 class="text-center">{{t('auth.login.login')}}</h1>
                    <v-text-field
                        v-model="email"
                        :rules="[rules.required, rules.email]"
                        :label="t('EmailAddress')"
                    ></v-text-field>
                    <v-text-field
                        class="mt-2"
                        v-model="password"
                        :rules="[rules.required]"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
                        :label="t('Password')"
                    ></v-text-field>
                    <v-switch
                        v-model="rememberMe"
                        :label="t('RememberMe')"
                        color="primary"
                    ></v-switch>

                    <v-btn
                        :loading="loading"
                        class="mt-2"
                        :text="t('Login')"
                        type="submit"
                        block
                        color="primary"
                    ></v-btn>
                    <div class="mt-2 text-center">
                        <NuxtLink class="text-decoration-none" :to="localeRoute('/auth/register')">
                            {{t('AccountCreate')}}
                        </NuxtLink>
                    </div>
                </v-form>
            </v-sheet>
        </v-card>
    </div>
</template>

<style scoped>

</style>