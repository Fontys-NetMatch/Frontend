<template>
  <v-container>
    <h1 class="text-h4 font-weight-bold mb-4">📦 Producten Dashboard</h1>

    <v-card class="pa-4">
      <v-card-title class="d-flex justify-space-between align-center flex-wrap gap-4">
        <span class="text-h6">Alle producten</span>

        <div class="d-flex align-center gap-4 flex-wrap">
          <v-btn color="primary" to="/Product/Create">➕ Nieuw Product</v-btn>

          <v-text-field
              v-model="search"
              label="Zoeken op naam"
              prepend-inner-icon="mdi-magnify"
              hide-details
              dense
              clearable
              variant="outlined"
              class="ml-4"
          />
        </div>
      </v-card-title>

      <v-data-table
          :headers="headers"
          :items="computedProducts"
          :search="search"
          :loading="isLoading"
          loading-text="Laden..."
          no-data-text="Geen producten gevonden"
          items-per-page-text="Producten per pagina"
          class="elevation-1"
      >
        <!-- Actief status -->
        <template v-slot:item.isActive="{ item }">
          <v-chip :color="item.isActive ? 'green' : 'red'" dark>
            {{ item.isActive ? 'Actief' : 'Inactief' }}
          </v-chip>
        </template>

        <!-- Acties -->
        <template v-slot:item.actions="{ item }">
          <v-btn small color="primary" :to="`/Product/manage/${item.raw.id}`">✏️ Bewerken</v-btn>
          <v-btn small color="error" @click="deleteProduct(item.raw.id)">🗑️ Verwijderen</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '~/store/auth'
import { useRuntimeConfig } from '#app'
import { toast } from 'vue3-toastify'

// ✅ Interface voor backend response
interface ProductType {
  id: number
  translations: { langIsoCode: string; name: string }[]
}
interface ProductTranslation {
  id: number
  langIsoCode: string
  name: string
  description: string
  isActive: boolean
}
interface Product {
  id: number
  translations: ProductTranslation[]
  productType: ProductType
}
interface ProductResponse {
  success: boolean
  products: Product[]
}

// ✅ Runtime config
const config = useRuntimeConfig()
const backendBaseUrl = config.public.backendBaseUrl || 'http://localhost:8213'

// ✅ Store
const authStore = useAuthStore()

// ✅ State
const search = ref('')
const isLoading = ref(false)
const products = ref<Product[]>([])

// ✅ Kolommen
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Naam', key: 'name' },
  { title: 'Omschrijving', key: 'description' },
  { title: 'Producttype', key: 'productTypeName' },
  { title: 'Actief', key: 'isActive' },
  { title: 'Acties', key: 'actions', sortable: false },
]

// ✅ Producttype mapping
const typeMapping: Record<number, string> = {
  1: 'Excursion',
  2: 'Activity',
  3: 'Tour',
  4: 'Flight',
  5: 'Hotel',
  6: 'Train',
  7: 'Bus'
}

// ✅ Ophalen van producten
const fetchProducts = async () => {
  isLoading.value = true
  try {
    const data = await $fetch<ProductResponse>(`${backendBaseUrl}/product`, {
      headers: {
        Authorization: `Bearer ${authStore.jwtToken}`
      }
    })

    if (data.success && Array.isArray(data.products)) {
      products.value = data.products
    } else {
      toast.error('Geen producten ontvangen van de backend')
    }
  } catch (err) {
    console.error(err)
    toast.error('Fout bij ophalen van producten')
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchProducts)

// ✅ Computed
const computedProducts = computed(() => {
  return products.value.map(p => {
    const translation = p.translations.find(t => t.langIsoCode === 'en') || p.translations[0]
    return {
      id: p.id,
      name: translation?.name || '—',
      description: translation?.description || '—',
      productTypeName: typeMapping[p.productType.id] || '—',
      isActive: translation?.isActive ?? false,
      raw: p
    }
  })
})

// ✅ Verwijderen (soft delete)
const deleteProduct = async (id: number) => {
  if (!confirm("Weet je zeker dat je dit product wilt verwijderen?")) return
  try {
    await $fetch(`${backendBaseUrl}/product/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authStore.jwtToken}`
      }
    })
    toast.success('Product verwijderd')
    products.value = products.value.filter(p => p.id !== id)
  } catch (err) {
    console.error(err)
    toast.error('Verwijderen mislukt')
  }
}
</script>

<style scoped>
.v-card-title {
  flex-wrap: wrap;
}
</style>

