<template>
  <v-container>
    <h1>Gearchiveerde Producten</h1>
    <v-card>
      <v-card-title>
        Archief
        <v-spacer></v-spacer>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Zoeken op naam"
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
          :headers="headers"
          :items="archivedProducts"
          :search="search"
          :loading="isLoading"
          loading-text="Laden..."
          no-data-text="Geen gearchiveerde producten gevonden"
          items-per-page-text="Producten per pagina"
          class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
              color="green"
              small
              @click="restoreProduct(item.raw)"
          >
            Herstellen
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRuntimeConfig } from '#app'
import { useAuthStore } from '~/store/auth'
import { toast } from 'vue3-toastify'

// Interfaces
interface ProductTranslation {
  langIsoCode: string
  name: string
  description: string
  tags: string[]
}

interface ProductTypeTranslation {
  langIsoCode: string
  name: string
}

interface ProductType {
  id: number
  translations: ProductTypeTranslation[]
}

interface Product {
  id: number
  deletedAt: string | null
  translations: ProductTranslation[]
  productType: ProductType
}

interface ProductResponse {
  success: boolean
  message: string
  statusCode: number
  statusDescription: string
  products: Product[]
}

const authStore = useAuthStore()
const config = useRuntimeConfig()
const backendBaseUrl = config.public.backendBaseUrl || 'http://localhost:8213'

const search = ref('')
const isLoading = ref(true)
const products = ref<Product[]>([])

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Naam', key: 'name' },
  { title: 'Verwijderd op', key: 'deletedAt' },
  { title: 'Producttype', key: 'productTypeName' },
  { title: 'Acties', key: 'actions', sortable: false }
]

// ✅ Ophalen gearchiveerde producten
const fetchArchived = async () => {
  try {
    const response = await $fetch<ProductResponse>(`${backendBaseUrl}/product?isDeleted=true`, {
      headers: {
        Authorization: `Bearer ${authStore.jwtToken}`
      }
    })

    if (response.success && Array.isArray(response.products)) {
      products.value = response.products
    } else {
      toast.error('Geen gearchiveerde producten gevonden')
    }
  } catch (err) {
    console.error(err)
    toast.error('Fout bij het ophalen van gearchiveerde producten')
  } finally {
    isLoading.value = false
  }
}

await fetchArchived()

// ✅ Computed
const archivedProducts = computed(() => {
  return products.value.map(p => {
    const translation = p.translations.find(t => t.langIsoCode === 'en') || p.translations[0]
    const productTypeTranslation = p.productType?.translations.find(t => t.langIsoCode === 'en') || { name: '—' }

    return {
      id: p.id,
      name: translation?.name || '—',
      deletedAt: p.deletedAt || '-',
      productTypeName: productTypeTranslation?.name || '—',
      raw: p
    }
  })
})

// ✅ Herstellen
const restoreProduct = async (product: Product) => {
  try {
    await $fetch(`${backendBaseUrl}/product/${product.id}/restore`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authStore.jwtToken}`
      }
    })
    toast.success('Product hersteld')
    products.value = products.value.filter(p => p.id !== product.id)
  } catch (err) {
    console.error(err)
    toast.error('Herstellen mislukt')
  }
}
</script>

<style scoped>
.v-card-title {
  align-items: center;
}
</style>
