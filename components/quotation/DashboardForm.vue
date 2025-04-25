<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToastStore } from '~/store/toast';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/store/auth';

const { t } = useI18n();
const quotations = ref<any[]>([]);
const loading = ref(true);
const { toast } = useToastStore();

const config = useRuntimeConfig();
const auth = useAuthStore();

// ✅ Ophalen van ALLE quotations
const fetchQuotations = async () => {
  try {
    const res = await $fetch(`${config.public.backendBaseUrl}/quotations`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.jwtToken}`,
        'Content-Type': 'application/json'
      }
    });

    if ('quotations' in res && Array.isArray(res.quotations)) {
      quotations.value = res.quotations;
    } else {
      toast(t('SomethingWentWrong'), 'error');
    }

  } catch (error: any) {
    console.error("Error fetching quotations:", error);
    toast(t('SomethingWentWrong'), 'error');
  } finally {
    loading.value = false;
  }
};

onMounted(fetchQuotations);
</script>

<template>
  <div class="flex justify-center">
    <v-card class="mx-auto mt-6" max-width="800">
      <v-card-title>
        {{ t('All quotations') }}
      </v-card-title>

      <v-card-text>
        <v-progress-linear
            v-if="loading"
            indeterminate
            color="primary"
            class="mb-4"
        />

        <v-list v-else-if="quotations.length > 0">
          <v-list-item
              v-for="quotation in quotations"
              :key="quotation.id"
          >
            <v-list-item-title>
              {{ quotation.name }}
            </v-list-item-title>

            <v-list-item-subtitle>
              {{ t('Status') }}: {{ quotation.status }} |
              {{ t('Customer ID') }}: {{ quotation.customerId }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <div v-else class="text-subtitle-1 text-center text-grey">
          {{ t('There are currently no quotations') }}
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.text-grey {
  color: #9e9e9e;
}
</style>
