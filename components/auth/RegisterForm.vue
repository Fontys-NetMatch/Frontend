<script setup lang="ts">
    import { ref } from 'vue';
    import { useToastStore } from '~/store/toast';

    const config = useRuntimeConfig();
    const { toast } = useToastStore();

    let loading = ref(false);
    let firstname = ref("");
    let surname = ref("");
    let email = ref("");
    let phone = ref("");
    let password = ref("");
    let passwordConfirm = ref("");
    let showPassword = ref(false);

    let rules = {
        required: value => !!value || 'Required.',
        email: v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        passwordMatch: () => password.value === passwordConfirm.value || 'Passwords do not match',
    };

    function validateFormSubmit(): boolean {
        let valid = true;
        if(!rules.required(firstname.value)) {
            valid = false;
        }
        if(!rules.required(surname.value)) {
            valid = false;
        }
        if(!rules.required(email.value)) {
            valid = false;
        }
        if(!rules.email(email.value)) {
            valid = false;
        }
        if(!rules.required(password.value)) {
            valid = false;
        }
        if(!rules.required(password.value)) {
            valid = false;
        }
        if(password.value !== passwordConfirm.value) {
            valid = false;
        }
        return valid;
    }

    function submitForm(): void {
        // Only block the request. Vuetify is handeling the messages
        if(!validateFormSubmit()) return;

        loading.value = true;

        let backendBaseUrl = config.public.backendBaseUrl;
        $fetch(backendBaseUrl + '/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                firstname: firstname.value,
                surname: surname.value,
                email: email.value,
                phone: phone.value,
                password: password.value
            }
        }).then(res => {
            if(res.success){
                toast("Account created successfully");
                navigateTo("/auth/login");
            }else{
                toast(res.message, 'error');
            }
            loading.value = false;
        });
    }

</script>

<template>
    <div class="flex justify-center align-content-center h-100">
        <v-card class="mx-auto mb-10" max-width="400">
            <v-sheet class="ma-4">
                <v-form validate-on="submit lazy" @submit.prevent="submitForm">
                    <h1 class="text-center">Register</h1>
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model="firstname"
                                :rules="[rules.required]"
                                label="Firstname*"
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model="surname"
                                :rules="[rules.required]"
                                label="Surname*"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-text-field
                        v-model="email"
                        :rules="[rules.required, rules.email]"
                        label="Email Address*"
                    ></v-text-field>
                    <v-text-field
                        v-model="phone"
                        label="Phone"
                    ></v-text-field>

                    <v-text-field
                        class="mt-2"
                        v-model="password"
                        :rules="[rules.required]"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
                        label="Password*"
                    ></v-text-field>
                    <v-text-field
                        class="mt-2"
                        v-model="passwordConfirm"
                        :rules="[rules.required, rules.passwordMatch]"
                        :type="showPassword ? 'text' : 'password'"
                        label="Password Confirm*"
                    ></v-text-field>

                    <v-btn
                        :loading="loading"
                        class="mt-2"
                        text="Register"
                        type="submit"
                        block
                        color="primary"
                    ></v-btn>
                    <div class="mt-2 text-center">
                        <NuxtLink class="text-decoration-none" to="/auth/login">
                            Login to your account
                        </NuxtLink>
                    </div>
                </v-form>
            </v-sheet>
        </v-card>
    </div>
</template>

<style scoped>

</style>