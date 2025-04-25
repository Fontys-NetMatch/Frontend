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
<!--        &lt;!&ndash; Actief chip &ndash;&gt;-->
<!--        <template v-slot:item.isActive="{ item }: { item: Product }">-->
<!--          <v-chip :color="item.isActive ? 'green' : 'red'" text-color="white">-->
<!--            {{ item.isActive ? 'Actief' : 'Inactief' }}-->
<!--          </v-chip>-->
<!--        </template>-->

<!--        &lt;!&ndash; Belastingen &ndash;&gt;-->
<!--        <template v-slot:item.taxes="{ item }: { item: Product }">-->
<!--          {{ item.taxes }}%-->
<!--        </template>-->

<!--        &lt;!&ndash; DeletedAt &ndash;&gt;-->
<!--        <template v-slot:item.deletedAt="{ item }: { item: Product }">-->
<!--          <span v-if="item.deletedAt">{{ item.deletedAt }}</span>-->
<!--          <span v-else>-</span>-->
<!--        </template>-->

<!--        &lt;!&ndash; Acties &ndash;&gt;-->
<!--        <template v-slot:item.actions="{ item }: { item: Product }">-->
<!--          <v-btn color="primary" small @click="editProduct(item)">Bewerken</v-btn>-->
<!--          <v-btn color="red" small @click="deleteProduct(item)">Verwijderen</v-btn>-->
<!--        </template>-->
<!--      </v-data-table>-->
<!--    </v-card>-->
<!--  </v-container>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { ref } from 'vue'-->
<!--import { toast } from 'vue3-toastify'-->
<!--import { useFetch } from '#app'-->

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
<!--  statusCode: number-->
<!--  statusDescription: string-->
<!--  data: T-->
<!--}-->

<!--const search = ref('')-->
<!--const isLoading = ref(true)-->
<!--const products = ref<Product[]>([])-->

<!--const headers = [-->
<!--  { title: 'ID', key: 'id' },-->
<!--  { title: 'Locatie', key: 'location' },-->
<!--  { title: 'Belastingen', key: 'taxes' },-->
<!--  { title: 'Verwijderd op', key: 'deletedAt' },-->
<!--  { title: 'Actief', key: 'isActive' },-->
<!--  { title: 'Producttype ID', key: 'productType_ID' },-->
<!--  { title: 'Acties', key: 'actions', sortable: false }-->
<!--]-->

<!--// ✅ Ophalen van producten-->
<!--const { data, error } = await useFetch<ApiResponse<{ products: Product[] }>>('http://localhost:3000/product/all', {-->
<!--  onRequest() {-->
<!--    isLoading.value = true-->
<!--  },-->
<!--  onResponse() {-->
<!--    isLoading.value = false-->
<!--  },-->
<!--  onRequestError() {-->
<!--    toast.error('Fout bij het ophalen van producten')-->
<!--  }-->
<!--})-->

<!--console.log("DEBUG - volledige fetch data:", data.value)-->

<!--if (data.value?.data?.products) {-->
<!--  products.value = data.value.data.products-->
<!--} else {-->
<!--  toast.error('Geen producten ontvangen van de backend')-->
<!--  console.error('API-response:', data.value)-->
<!--}-->


<!--// Bewerken-->
<!--const editProduct = (item: Product) => {-->
<!--  console.log('Bewerk product:', item)-->
<!--}-->

<!--// Verwijderen-->
<!--const deleteProduct = async (item: Product) => {-->
<!--  if (confirm('Weet je zeker dat je dit product wilt verwijderen?')) {-->
<!--    try {-->
<!--      await $fetch(`http://localhost:3000/product/${item.id}`, { method: 'DELETE' })-->
<!--      products.value = products.value.filter(p => p.id !== item.id)-->
<!--      toast.success('Product verwijderd')-->
<!--    } catch (err) {-->
<!--      console.error(err)-->
<!--      toast.error('Verwijderen mislukt')-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.v-card-title {-->
<!--  align-items: center;-->
<!--}-->
<!--</style>-->


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
<!--        <template v-slot:item.isActive="{ item }: { item: Product }">-->
<!--          <v-chip :color="item.isActive ? 'green' : 'red'" text-color="white">-->
<!--            {{ item.isActive ? 'Actief' : 'Inactief' }}-->
<!--          </v-chip>-->
<!--        </template>-->

<!--        <template v-slot:item.taxes="{ item }: { item: Product }">-->
<!--          {{ item.taxes }}%-->
<!--        </template>-->

<!--        <template v-slot:item.deletedAt="{ item }: { item: Product }">-->
<!--          <span v-if="item.deletedAt">{{ item.deletedAt }}</span>-->
<!--          <span v-else>-</span>-->
<!--        </template>-->

<!--        <template v-slot:item.actions="{ item }: { item: Product }">-->
<!--          <v-btn color="primary" small @click="editProduct(item)">Bewerken</v-btn>-->
<!--          <v-btn color="red" small @click="deleteProduct(item)">Verwijderen</v-btn>-->
<!--        </template>-->
<!--      </v-data-table>-->
<!--    </v-card>-->
<!--  </v-container>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { ref } from 'vue'-->
<!--import { toast } from 'vue3-toastify'-->
<!--import { useFetch, useRuntimeConfig } from '#app'-->

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
<!--  statusCode: number-->
<!--  statusDescription: string-->
<!--  data: T-->
<!--}-->

<!--// ✅ Config-->
<!--const config = useRuntimeConfig()-->
<!--const backendBaseUrl = config.public.backendBaseUrl || 'http://localhost:8213'-->

<!--// ✅ Reactives-->
<!--const search = ref('')-->
<!--const isLoading = ref(true)-->
<!--const products = ref<Product[]>([])-->

<!--const headers = [-->
<!--  { title: 'ID', key: 'id' },-->
<!--  { title: 'Locatie', key: 'location' },-->
<!--  { title: 'Belastingen', key: 'taxes' },-->
<!--  { title: 'Verwijderd op', key: 'deletedAt' },-->
<!--  { title: 'Actief', key: 'isActive' },-->
<!--  { title: 'Producttype ID', key: 'productType_ID' },-->
<!--  { title: 'Acties', key: 'actions', sortable: false }-->
<!--]-->

<!--// ✅ Ophalen van producten-->
<!--const { data, error } = await useFetch<ApiResponse<{ products: Product[] }>>(`${backendBaseUrl}/product/all`, {-->
<!--  onRequest() {-->
<!--    isLoading.value = true-->
<!--  },-->
<!--  onResponse() {-->
<!--    isLoading.value = false-->
<!--  },-->
<!--  onRequestError() {-->
<!--    toast.error('Fout bij het ophalen van producten')-->
<!--  }-->
<!--})-->

<!--console.log("DEBUG - volledige fetch data:", data.value)-->

<!--if (data.value?.data?.products) {-->
<!--  products.value = data.value.data.products-->
<!--} else {-->
<!--  toast.error('Geen producten ontvangen van de backend')-->
<!--  console.error('API-response:', data.value)-->
<!--}-->

<!--// Bewerken-->
<!--const editProduct = (item: Product) => {-->
<!--  console.log('Bewerk product:', item)-->
<!--}-->

<!--// Verwijderen-->
<!--const deleteProduct = async (item: Product) => {-->
<!--  if (confirm('Weet je zeker dat je dit product wilt verwijderen?')) {-->
<!--    try {-->
<!--      await $fetch(`${backendBaseUrl}/product/${item.id}`, { method: 'DELETE' })-->
<!--      products.value = products.value.filter(p => p.id !== item.id)-->
<!--      toast.success('Product verwijderd')-->
<!--    } catch (err) {-->
<!--      console.error(err)-->
<!--      toast.error('Verwijderen mislukt')-->
<!--    }-->
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
    <h1>Producten Dashboard</h1>
    <v-card>
      <v-card-title>
        Producten
        <v-spacer></v-spacer>
        <v-btn color="primary" to="/product/create">Nieuw Product</v-btn>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Zoeken op naam"
            single-line
            hide-details
            class="ml-4"
        ></v-text-field>
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
        <template v-slot:item.actions="{ item }">
          <v-btn small color="primary" @click="editProduct(item.raw)">Bewerken</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'
import { useRuntimeConfig } from '#app'
import { useAuthStore } from '~/store/auth'

// Interfaces
interface ProductDate {
  id: number
  price: number
  startDate: string
  endDate: string
  slots: number
  isActive: boolean
}

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
  isActive: boolean
  translations: ProductTypeTranslation[]
}

interface Product {
  id: number
  translations: ProductTranslation[]
  productType: ProductType
  dates: ProductDate[]
}

interface ApiResponse<T> {
  success: boolean
  message: string
  statusCode: number
  statusDescription: string
  products: T
}

// Reactives
const search = ref('')
const isLoading = ref(true)
const products = ref<Product[]>([])
const authStore = useAuthStore()
const config = useRuntimeConfig()
const backendBaseUrl = config.public.backendBaseUrl || 'http://localhost:8213'

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Naam', key: 'name' },
  { title: 'Omschrijving', key: 'description' },
  { title: 'Producttype', key: 'productTypeName' },
  { title: 'Acties', key: 'actions', sortable: false }
]

// ✅ Ophalen van producten
const { data } = await useFetch<ApiResponse<Product[]>>(
    `${backendBaseUrl}/product`,
    {
      headers: {
        Authorization: `Bearer ${authStore.jwtToken}`
      },
      onRequest() {
        isLoading.value = true
      },
      onResponse() {
        isLoading.value = false
      },
      onRequestError() {
        toast.error('Fout bij het ophalen van producten')
      }
    }
)

// ✅ Veilige destructuring
console.log('✅ API-response:', data.value)

if (data.value?.success && Array.isArray(data.value.products)) {
  products.value = data.value.products
} else {
  toast.error('Geen producten ontvangen van de backend')
  console.error('API-response:', data.value)
}

// ✅ Computed voor tabelweergave
const computedProducts = computed(() => {
  return products.value.map(p => {
    const translation = p.translations.find(t => t.langIsoCode === 'en') || p.translations[0]
    const productTypeTranslation = p.productType?.translations.find(t => t.langIsoCode === 'en') || { name: '—' }

    return {
      id: p.id,
      name: translation?.name || '—',
      description: translation?.description || '—',
      productTypeName: productTypeTranslation?.name || '—',
      raw: p
    }
  })
})

// Bewerken
const editProduct = (product: Product) => {
  console.log('🛠️ Bewerken:', product)
  toast.info(`Product "${product.translations[0]?.name}" geselecteerd voor bewerking`)
}
</script>

<style scoped>
.v-card-title {
  align-items: center;
}
</style>






