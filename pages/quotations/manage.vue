<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { locale, t } = useI18n();

console.log("Current language:", locale.value);
</script>

<template>
  <div>
    <p>{{ t('current-language-locale', [locale]) }}</p>
    <p>{{ t('message') }}</p>  <!-- Will display "Hello" if English is selected -->
    <p>{{t('Test')}}</p>
  </div>
</template>
