<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToastStore } from '~/store/toast';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '~/store/auth';

const { locale, t } = useI18n();
const products = ref<any[]>([]);
const loading = ref(true);
const { toast } = useToastStore();

const config = useRuntimeConfig();
const auth = useAuthStore();

const getTranslation = (product: any) => {
  return product.translations?.find((t: any) => t.langIsoCode === locale.value)
      || product.translations?.find((t: any) => t.langIsoCode === 'en');
};



const fetchInactiveProducts = async () => {
  try {
    const res = await $fetch(`${config.public.backendBaseUrl}/product?isDeleted=true`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.jwtToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log("Ontvangen producten:", res);

    if ('products' in res && Array.isArray(res.products)) {
      products.value = res.products;
      console.log("Vertalingen per product:");
      products.value.forEach((p) => console.log(`Product ${p.id} translations:`, p.translations));
    }


  }

  catch (error: any) {
    toast(t('SomethingWentWrong'), 'error');
  }

  finally {
    loading.value = false;
  }
};

const restoreProduct = async (id: number) => {
  try {
    await $fetch(`${config.public.backendBaseUrl}/product/restore/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${auth.jwtToken}`,
        'Content-Type': 'application/json'
      }
    });

    toast(t('Product restored succesfully'), 'success');
    products.value = products.value.filter(p => p.id !== id);
  }

  catch (error: any) {
    console.error("Error while restoring:", error);
    toast(t('SomethingWentWrong'), 'error');
  }
};

onMounted(fetchInactiveProducts);
</script>

<template>
  <div class="flex justify-center">
    <v-card class="mx-auto mt-6" max-width="800">
      <v-card-title>
        {{ t('Inactive products') }}
      </v-card-title>

      <v-card-text>
        <v-progress-linear
            v-if="loading"
            indeterminate
            color="primary"
            class="mb-4"
        ></v-progress-linear>

        <v-list v-else-if="products.length > 0">
          <v-list-item
              v-for="product in products"
              :key="product.id"
          >
            <v-list-item-title>
              {{ getTranslation(product)?.name || 'No name' }}
            </v-list-item-title>

            <v-list-item-subtitle>
              <div style="white-space: pre-wrap;" class="text-body-2 text--secondary">
                {{ getTranslation(product)?.description || 'No description' }}
              </div>
            </v-list-item-subtitle>

            <v-btn
                color="success"
                size="small"
                style="margin-top: 10px"
                @click="restoreProduct(product.id)"
            >
              {{ t('Restore') }}
            </v-btn>

          </v-list-item>
        </v-list>

        <div v-else class="text-subtitle-1 text-center text-grey">
          {{ t('There are currently no deleted products') }}
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

