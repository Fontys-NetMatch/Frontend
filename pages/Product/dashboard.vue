<!--<template>-->
<!--  <v-container>-->
<!--    <h1>Producten Dashboard</h1>-->
<!--    <v-card>-->
<!--      <v-card-title>-->
<!--        Producten-->
<!--        <v-spacer></v-spacer>-->
<!--        <v-btn color="primary" to="/product/create">Nieuw Product</v-btn>-->
<!--        <v-text-field-->
<!--            v-model="search"-->
<!--            append-icon="mdi-magnify"-->
<!--            label="Zoeken op locatie"-->
<!--            single-line-->
<!--            hide-details-->
<!--            class="ml-4"-->
<!--        ></v-text-field>-->
<!--      </v-card-title>-->

<!--      <v-data-table-->
<!--          :headers="headers"-->
<!--          :items="products"-->
<!--          :search="search"-->
<!--          :loading="isLoading"-->
<!--          loading-text="Laden..."-->
<!--          no-data-text="Geen producten gevonden"-->
<!--          items-per-page-text="Producten per pagina"-->
<!--          class="elevation-1"-->
<!--      >-->
<!--        &lt;!&ndash; Statuschip &ndash;&gt;-->
<!--        <template v-slot:item.isActive="{ item }: { item: Product }">-->
<!--          <v-chip :color="item.isActive ? 'green' : 'red'" text-color="white">-->
<!--            {{ item.isActive ? 'Actief' : 'Inactief' }}-->
<!--          </v-chip>-->
<!--        </template>-->

<!--        &lt;!&ndash; Actieknoppen &ndash;&gt;-->
<!--        <template v-slot:item.actions="{ item }: { item: Product }">-->
<!--          <v-btn color="primary" small @click="editProduct(item)">Bewerken</v-btn>-->
<!--          <v-btn color="red" small @click="deleteProduct(item)">Verwijderen</v-btn>-->
<!--        <template v-slot:item.actions="{ item }">-->
<!--          <v-btn small color="primary" :to="`/product/manage/${item.raw.id}`">Bewerken</v-btn>-->
<!--          <v-btn small color="error" @click="deleteProduct(item.raw.id)">Verwijderen</v-btn>-->
<!--        </template>-->
<!--      </v-data-table>-->
<!--    </v-card>-->
<!--  </v-container>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { ref } from 'vue'-->
<!--import { useRouter } from 'vue-router'-->
<!--import { toast } from 'vue3-toastify'-->
<!--import { onMounted } from 'vue'-->

<!--const router = useRouter()-->

<!--// ✅ Types-->
<!--interface Product {-->
<!--  id: number-->
<!--  location: string-->
<!--  taxes: number-->
<!--  deletedAt?: string | null-->
<!--  isActive: boolean-->
<!--  productType_ID: number-->
<!--}-->

<!--interface ApiResponse<T> {-->
<!--  success: boolean-->
<!--  message: string-->
<!--  data: T-->
<!--}-->

<!--// ✅ State-->
<!--const search = ref('')-->
<!--const isLoading = ref(true)-->
<!--const products = ref<Product[]>([])-->

<!--// Kolommen in je data-table-->
<!--const headers = [-->
<!--  { title: 'ID', key: 'id' },-->
<!--  { title: 'Locatie', key: 'location' },-->
<!--  { title: 'Belastingen', key: 'taxes' },-->
<!--  { title: 'Verwijderd op', key: 'deletedAt' },-->
<!--  { title: 'Actief', key: 'isActive' },-->
<!--  { title: 'Producttype ID', key: 'productType_ID' },-->
<!--  { title: 'Acties', key: 'actions', sortable: false },-->
<!--]-->

<!--// ✅ Ophalen van producten-->
<!--const fetchProducts = async () => {-->
<!--  isLoading.value = true-->
<!--  try {-->
<!--    const response = await $fetch<ApiResponse<{ products: Product[] }>>(-->
<!--        'http://localhost:3000/product/all'-->
<!--    )-->

<!--    if (response?.data?.products) {-->
<!--      products.value = response.data.products-->
<!--    } else {-->
<!--      toast.error('Geen producten gevonden')-->
<!--    }-->
<!--  } catch (err) {-->
<!--    console.error('Fout bij ophalen producten:', err)-->
<!--    toast.error('Fout bij het ophalen van producten')-->
<!--  } finally {-->
<!--    isLoading.value = false-->
<!--  }-->
<!--}-->

<!--onMounted(fetchProducts)-->

<!--// ✅ Bewerken-->
<!--const editProduct = (item: Product) => {-->
<!--  router.push(`/product/edit/${item.id}`)-->
<!--}-->

<!--// ✅ Verwijderen-->
<!--const deleteProduct = async (item: Product) => {-->
<!--  if (confirm(`Weet je zeker dat je product "${item.location}" wilt verwijderen?`)) {-->
<!--    try {-->
<!--      await $fetch(`http://localhost:3000/product/${item.id}`, {-->
<!--        method: 'DELETE',-->
<!--      })-->
<!--      products.value = products.value.filter((p) => p.id !== item.id)-->
<!--      toast.success('Product verwijderd')-->
<!--    } catch (err) {-->
<!--      console.error('Verwijderen mislukt:', err)-->
<!--      toast.error('Verwijderen mislukt')-->
<!--    }-->
<!--// Mapping voor product type IDs-->
<!--const typeMapping: Record<number, string> = {-->
<!--  1: 'Excursion',-->
<!--  2: 'Activity',-->
<!--  3: 'Tour',-->
<!--  4: 'Flight',-->
<!--  5: 'Hotel',-->
<!--  6: 'Train',-->
<!--  7: 'Bus'-->
<!--}-->

<!--// Ophalen van producten-->
<!--const { data } = await useFetch<ApiResponse<Product[]>>(-->
<!--    `${backendBaseUrl}/product`,-->
<!--    {-->
<!--      headers: {-->
<!--        Authorization: `Bearer ${authStore.jwtToken}`-->
<!--      },-->
<!--      onRequest() {-->
<!--        isLoading.value = true-->
<!--      },-->
<!--      onResponse() {-->
<!--        isLoading.value = false-->
<!--      },-->
<!--      onRequestError() {-->
<!--        toast.error('Fout bij het ophalen van producten')-->
<!--      }-->
<!--    }-->
<!--)-->

<!--// Als de API succesvol was, vullen we de producten lijst-->
<!--if (data.value?.success && Array.isArray(data.value.products)) {-->
<!--  products.value = data.value.products-->
<!--} else {-->
<!--  toast.error('Geen producten ontvangen van de backend')-->
<!--  console.error('API-response:', data.value)-->
<!--}-->

<!--// Computed data voor de data-table-->
<!--const computedProducts = computed(() => {-->
<!--  return products.value.map(p => {-->
<!--    const translation = p.translations.find(t => t.langIsoCode === 'en') || p.translations[0]-->
<!--    const productTypeName = typeMapping[p.productType.id] || '—'-->

<!--    return {-->
<!--      id: p.id,-->
<!--      name: translation?.name || '—',-->
<!--      description: translation?.description || '—',-->
<!--      productTypeName,-->
<!--      raw: p-->
<!--    }-->
<!--  })-->
<!--})-->

<!--// Verwijderen van producten (soft delete)-->
<!--const deleteProduct = async (id: number) => {-->
<!--  if (!confirm("Weet je zeker dat je dit product wilt verwijderen?")) {-->
<!--    return;-->
<!--  }-->

<!--  try {-->
<!--    await $fetch(`${backendBaseUrl}/product/${id}`, {-->
<!--      method: 'DELETE',-->
<!--      headers: {-->
<!--        Authorization: `Bearer ${authStore.jwtToken}`-->
<!--      }-->
<!--    })-->
<!--    toast.success('Product succesvol verwijderd')-->
<!--    window.location.reload()-->
<!--  } catch (err) {-->
<!--    console.error(err)-->
<!--    toast.error('Verwijderen mislukt')-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.v-card-title {-->
<!--  align-items: center;-->
<!--}-->
<!--</style>-->

<template>
  <v-container>
    <h1 class="text-h4 font-weight-bold mb-4">📦 Producten Dashboard</h1>

    <v-card class="pa-4">
      <v-card-title class="d-flex justify-space-between align-center flex-wrap gap-4">
        <span class="text-h6">Alle producten</span>

        <div class="d-flex align-center gap-4 flex-wrap">
          <v-btn color="primary" to="/Product/manage/create">➕ Nieuw Product</v-btn>

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
          <v-btn small color="primary" :to="`/Product/Edit/manage/${item.raw.id}`">✏️ Bewerken</v-btn>
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

