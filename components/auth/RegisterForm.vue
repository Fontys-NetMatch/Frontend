<script setup lang="ts">
    import { ref } from 'vue';
    import { useToastStore } from '~/store/toast';
    import { rules } from '~/utils/userValidation';
    import { useI18n } from 'vue-i18n';

    const config = useRuntimeConfig();
    const { toast } = useToastStore();
    const { t } = useI18n();
    const localeRoute = useLocaleRoute();

    // Form values
    const firstname = ref('');
    const surname = ref('');
    const email = ref('');
    const phone = ref('');
    const password = ref('');
    const passwordConfirm = ref('');
    const showPassword = ref(false);
    const loading = ref(false);

    // Validate check
    function validateFormSubmit(): boolean {
      let valid = true;

      if (rules.required(firstname.value) !== true) valid = false;
      if (rules.required(surname.value) !== true) valid = false;
      if (rules.required(email.value) !== true) valid = false;
      if (rules.email(email.value) !== true) valid = false;
      if (rules.required(password.value) !== true) valid = false;
      if (rules.passwordStrength(password.value) !== true) valid = false;
      if (rules.passwordLength(password.value) !== true) valid = false;
      if (rules.required(passwordConfirm.value) !== true) valid = false;

      const passwordMatchResult = rules.passwordMatch(() => password.value)(passwordConfirm.value);
      if (passwordMatchResult !== true) valid = false;

      return valid;
    }

    // Submit
    async function submitForm(): Promise<void> {
        if (!validateFormSubmit()) return;
        loading.value = true;

        try {
            const res = await $fetch(backendBaseUrl + '/auth/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: {
                firstname: firstname.value,
                surname: surname.value,
                email: email.value,
                phone: phone.value,
                password: password.value,
              }
            });

            if (res.success) {
              toast(t("AccountCreatedSuccessfully"));
              navigateTo("/auth/login");
            } else {
              toast(res.message || t('RegistrationFailed'), 'error');
            }
        } catch (error: any) {
            toast(t('SomethingWentWrong'), 'error');
        } finally {
            loading.value = false;
        }
    }
</script>

<template>
  <div class="flex justify-center align-content-center h-100">
    <v-card class="mx-auto mb-10" max-width="400">
      <v-sheet class="ma-4">
        <v-form ref="formRef" validate-on="submit lazy" @submit.prevent="submitForm">
          <h1 class="text-center">{{ t('Register') }}</h1>
          <v-row>
            <v-col>
              <v-text-field
                  v-model="firstname"
                  :rules="[rules.required]"
                  :label="t('Firstname') + '*'"
              />
            </v-col>
            <v-col>
              <v-text-field
                  v-model="surname"
                  :rules="[rules.required]"
                  :label="t('Surname') + '*'"
              />
            </v-col>
          </v-row>

          <v-text-field
              v-model="email"
              :rules="[rules.required, rules.email]"
              :label="t('EmailAddress') + '*'"
          />

          <v-text-field
              v-model="phone"
              :label="t('Phone')"
          />

          <v-text-field
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              :rules="[rules.required, rules.passwordLength, rules.passwordStrength]"
              :label="t('Password') + '*'"
          />

          <v-text-field
              class="mt-2"
              v-model="passwordConfirm"
              :rules="[rules.required, rules.passwordMatch(() => password.value)]"
              :type="showPassword ? 'text' : 'password'"
              :label="t('PasswordConfirm') + '*'"
          />

            <v-btn
                :loading="loading"
                class="mt-2"
                :text="t('Register')"
                type="submit"
                block
                color="primary"
            ></v-btn>
            <div class="mt-2 text-center">
            <NuxtLink class="text-decoration-none" :to="localeRoute('auth-login')">
              {{ t('LoginToAccount') }}
            </NuxtLink>
          </div>
        </v-form>
      </v-sheet>
    </v-card>
  </div>
</template>

<style scoped>
</style>
