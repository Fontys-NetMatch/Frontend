<template>
  <v-container>
    <h1>Producten Dashboard</h1>
    <v-card>
      <v-card-title>
        Producten
        <v-spacer></v-spacer>
        <v-btn color="primary" to="/product/create">Nieuw Product</v-btn>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Zoeken op locatie"
            single-line
            hide-details
            class="ml-4"
        ></v-text-field>
      </v-card-title>

      <v-data-table
          :headers="headers"
          :items="products"
          :search="search"
          :loading="isLoading"
          loading-text="Laden..."
          no-data-text="Geen producten gevonden"
          items-per-page-text="Producten per pagina"
          class="elevation-1"
      >
        <!-- Statuschip -->
        <template v-slot:item.isActive="{ item }: { item: Product }">
          <v-chip :color="item.isActive ? 'green' : 'red'" text-color="white">
            {{ item.isActive ? 'Actief' : 'Inactief' }}
          </v-chip>
        </template>

        <!-- Actieknoppen -->
        <template v-slot:item.actions="{ item }: { item: Product }">
          <v-btn color="primary" small @click="editProduct(item)">Bewerken</v-btn>
          <v-btn color="red" small @click="deleteProduct(item)">Verwijderen</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { onMounted } from 'vue'

const router = useRouter()

// ✅ Types
interface Product {
  id: number
  location: string
  taxes: number
  deletedAt?: string | null
  isActive: boolean
  productType_ID: number
}

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

// ✅ State
const search = ref('')
const isLoading = ref(true)
const products = ref<Product[]>([])

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Locatie', key: 'location' },
  { title: 'Belastingen', key: 'taxes' },
  { title: 'Verwijderd op', key: 'deletedAt' },
  { title: 'Actief', key: 'isActive' },
  { title: 'Producttype ID', key: 'productType_ID' },
  { title: 'Acties', key: 'actions', sortable: false },
]

// ✅ Ophalen van producten
const fetchProducts = async () => {
  isLoading.value = true
  try {
    const response = await $fetch<ApiResponse<{ products: Product[] }>>(
        'http://localhost:3000/product/all'
    )

    if (response?.data?.products) {
      products.value = response.data.products
    } else {
      toast.error('Geen producten gevonden')
    }
  } catch (err) {
    console.error('Fout bij ophalen producten:', err)
    toast.error('Fout bij het ophalen van producten')
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchProducts)

// ✅ Bewerken
const editProduct = (item: Product) => {
  router.push(`/product/edit/${item.id}`)
}

// ✅ Verwijderen
const deleteProduct = async (item: Product) => {
  if (confirm(`Weet je zeker dat je product "${item.location}" wilt verwijderen?`)) {
    try {
      await $fetch(`http://localhost:3000/product/${item.id}`, {
        method: 'DELETE',
      })
      products.value = products.value.filter((p) => p.id !== item.id)
      toast.success('Product verwijderd')
    } catch (err) {
      console.error('Verwijderen mislukt:', err)
      toast.error('Verwijderen mislukt')
    }
  }
}
</script>

<style scoped>
.v-card-title {
  align-items: center;
}
</style>

