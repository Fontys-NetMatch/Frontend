<!--<template>-->
<!--  <v-container>-->
<!--    <h1>Product bewerken</h1>-->

<!--    <v-form v-if="product" @submit.prevent="submitForm">-->
<!--      &lt;!&ndash; Naam &ndash;&gt;-->
<!--      <v-text-field-->
<!--          v-model="productName"-->
<!--          label="Productnaam"-->
<!--          required-->
<!--      ></v-text-field>-->

<!--      &lt;!&ndash; Omschrijving &ndash;&gt;-->
<!--      <v-textarea-->
<!--          v-model="productDescription"-->
<!--          label="Omschrijving"-->
<!--          required-->
<!--      ></v-textarea>-->

<!--      &lt;!&ndash; Start Location &ndash;&gt;-->
<!--      <v-text-field-->
<!--          v-model="startLocation"-->
<!--          label="Start Location"-->
<!--          required-->
<!--      ></v-text-field>-->

<!--      &lt;!&ndash; End Location &ndash;&gt;-->
<!--      <v-text-field-->
<!--          v-model="endLocation"-->
<!--          label="End Location"-->
<!--          required-->
<!--      ></v-text-field>-->

<!--      &lt;!&ndash; Product Type &ndash;&gt;-->
<!--      <v-select-->
<!--          v-model="productTypeName"-->
<!--          :items="availableTypes"-->
<!--          label="Producttype"-->
<!--          required-->
<!--      ></v-select>-->

<!--      <v-btn type="submit" color="primary" class="mt-4">Opslaan</v-btn>-->
<!--    </v-form>-->

<!--    <v-alert v-else type="info" title="Laden...">Productgegevens worden opgehaald...</v-alert>-->
<!--  </v-container>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { ref, onMounted } from 'vue'-->
<!--import { useRoute, useRouter } from 'vue-router'-->
<!--import { useRuntimeConfig } from '#app'-->
<!--import { useAuthStore } from '~/store/auth'-->
<!--import { toast } from 'vue3-toastify'-->

<!--// Interfaces-->
<!--interface ProductTranslation {-->
<!--  id: number-->
<!--  langIsoCode: string-->
<!--  name: string-->
<!--  description: string-->
<!--  tags: string[]-->
<!--}-->

<!--interface ProductTypeTranslation {-->
<!--  langIsoCode: string-->
<!--  name: string-->
<!--}-->

<!--interface ProductType {-->
<!--  id: number-->
<!--  translations: ProductTypeTranslation[]-->
<!--}-->

<!--interface ProductResponse {-->
<!--  success: boolean-->
<!--  id: number-->
<!--  startLocation: string-->
<!--  endLocation: string-->
<!--  productType: ProductType-->
<!--  translations: ProductTranslation[]-->
<!--}-->

<!--const route = useRoute()-->
<!--const router = useRouter()-->
<!--const authStore = useAuthStore()-->
<!--const config = useRuntimeConfig()-->
<!--const backendBaseUrl = config.public.backendBaseUrl || 'http://localhost:8213'-->

<!--const productId = Number(route.params.id)-->

<!--// Reactives-->
<!--const product = ref<ProductResponse | null>(null)-->
<!--const productName = ref('')-->
<!--const productDescription = ref('')-->
<!--const productTypeName = ref('')-->
<!--const startLocation = ref('')-->
<!--const endLocation = ref('')-->
<!--const translationId = ref(0)-->
<!--const availableTypes = ref<string[]>(['Excursion', 'Activity', 'Tour', 'Flight'])-->

<!--// Ophalen van product-->
<!--const fetchProduct = async () => {-->
<!--  try {-->
<!--    const response = await $fetch<ProductResponse>(`${backendBaseUrl}/product/${productId}`, {-->
<!--      headers: {-->
<!--        Authorization: `Bearer ${authStore.jwtToken}`-->
<!--      }-->
<!--    })-->

<!--    if (response.success) {-->
<!--      product.value = response-->
<!--      const translation = response.translations.find(t => t.langIsoCode === 'en') || response.translations[0]-->

<!--      translationId.value = translation?.id || 0-->
<!--      productName.value = translation?.name || ''-->
<!--      productDescription.value = translation?.description || ''-->
<!--      productTypeName.value = response.productType?.translations?.[0]?.name || ''-->
<!--      startLocation.value = response.startLocation || ''-->
<!--      endLocation.value = response.endLocation || ''-->
<!--    } else {-->
<!--      toast.error('Product niet gevonden')-->
<!--      router.push('/product/dashboard')-->
<!--    }-->
<!--  } catch (err) {-->
<!--    console.error(err)-->
<!--    toast.error('Fout bij ophalen van product')-->
<!--    router.push('/product/dashboard')-->
<!--  }-->
<!--}-->

<!--onMounted(fetchProduct)-->

<!--// Opslaan-->
<!--const submitForm = async () => {-->
<!--  try {-->
<!--    // 🟢 Basisgegevens updaten-->
<!--    const productBody = {-->
<!--      startLocation: startLocation.value,-->
<!--      endLocation: endLocation.value,-->
<!--      deletedAt: null,-->
<!--      productTypeId: getProductTypeId(productTypeName.value)-->
<!--    }-->
<!--    console.log("Product update body:", productBody)-->

<!--    await $fetch(`${backendBaseUrl}/product/${productId}`, {-->
<!--      method: 'PUT',-->
<!--      headers: {-->
<!--        Authorization: `Bearer ${authStore.jwtToken}`,-->
<!--        'Content-Type': 'application/json'-->
<!--      },-->
<!--      body: productBody-->
<!--    })-->

<!--    // 🟢 Vertaling updaten — LET OP → correcte backend URL nu-->
<!--    const translationBody = {-->
<!--      name: productName.value,-->
<!--      description: productDescription.value,-->
<!--      isActive: true-->
<!--    }-->
<!--    console.log("Translation update body:", translationBody)-->

<!--    await $fetch(`${backendBaseUrl}/product/${productId}/translations/${translationId.value}`, {-->
<!--      method: 'PUT',-->
<!--      headers: {-->
<!--        Authorization: `Bearer ${authStore.jwtToken}`,-->
<!--        'Content-Type': 'application/json'-->
<!--      },-->
<!--      body: translationBody-->
<!--    })-->

<!--    toast.success('Product bijgewerkt')-->
<!--    router.push('/product/dashboard')-->
<!--  } catch (err) {-->
<!--    console.error(err)-->
<!--    toast.error('Bijwerken mislukt')-->
<!--  }-->
<!--}-->

<!--// Mapping productType name naar id-->
<!--function getProductTypeId(name: string): number {-->
<!--  const mapping: Record<string, number> = {-->
<!--    Excursion: 1,-->
<!--    Activity: 2,-->
<!--    Tour: 3,-->
<!--    Flight: 4-->
<!--  }-->
<!--  return mapping[name] || 0-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.v-container {-->
<!--  max-width: 700px;-->
<!--  margin: auto;-->
<!--}-->
<!--</style>-->


<template>
  <v-container>
    <h1>Product bewerken</h1>

    <v-form v-if="product" @submit.prevent="submitForm">
      <!-- Naam -->
      <v-text-field
          v-model="productName"
          label="Productnaam"
          required
      ></v-text-field>

      <!-- Omschrijving -->
      <v-textarea
          v-model="productDescription"
          label="Omschrijving"
          required
      ></v-textarea>

      <!-- Start Location -->
      <v-text-field
          v-model="startLocation"
          label="Start Location"
          required
      ></v-text-field>

      <!-- End Location -->
      <v-text-field
          v-model="endLocation"
          label="End Location"
          required
      ></v-text-field>

      <!-- Product Type -->
      <v-select
          v-model="productTypeId"
          :items="availableTypes"
          item-value="id"
          item-title="name"
          label="Producttype"
          required
      ></v-select>

      <v-btn type="submit" color="primary" class="mt-4">Opslaan</v-btn>
    </v-form>

    <v-alert v-else type="info" title="Laden...">Productgegevens worden opgehaald...</v-alert>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRuntimeConfig } from '#app'
import { useAuthStore } from '~/store/auth'
import { toast } from 'vue3-toastify'

// Interfaces
interface ProductTranslation {
  id: number
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

interface ProductResponse {
  success: boolean
  id: number
  startLocation: string
  endLocation: string
  productType: ProductType
  translations: ProductTranslation[]
}

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const config = useRuntimeConfig()
const backendBaseUrl = config.public.backendBaseUrl || 'http://localhost:8213'

const productId = Number(route.params.id)

// Reactives
const product = ref<ProductResponse | null>(null)
const productName = ref('')
const productDescription = ref('')
const productTypeId = ref(0)
const startLocation = ref('')
const endLocation = ref('')
const translationId = ref(0)
const availableTypes = ref([
  { id: 1, name: 'Excursion' },
  { id: 2, name: 'Activity' },
  { id: 3, name: 'Tour' },
  { id: 4, name: 'Flight' }
])

// Ophalen van product
const fetchProduct = async () => {
  try {
    const response = await $fetch<ProductResponse>(`${backendBaseUrl}/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${authStore.jwtToken}`
      }
    })

    if (response.success) {
      product.value = response
      const translation = response.translations.find(t => t.langIsoCode === 'en') || response.translations[0]

      translationId.value = translation?.id || 0
      productName.value = translation?.name || ''
      productDescription.value = translation?.description || ''
      productTypeId.value = response.productType?.id || 0
      startLocation.value = response.startLocation || ''
      endLocation.value = response.endLocation || ''
    } else {
      toast.error('Product niet gevonden')
      router.push('/product/dashboard')
    }
  } catch (err) {
    console.error(err)
    toast.error('Fout bij ophalen van product')
    router.push('/product/dashboard')
  }
}

onMounted(fetchProduct)

// Opslaan
const submitForm = async () => {
  try {
    const productBody = {
      startLocation: startLocation.value,
      endLocation: endLocation.value,
      deletedAt: null,
      productTypeId: productTypeId.value
    }
    console.log("Product update body:", productBody)

    await $fetch(`${backendBaseUrl}/product/${productId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authStore.jwtToken}`,
        'Content-Type': 'application/json'
      },
      body: productBody
    })

    const translationBody = {
      name: productName.value,
      description: productDescription.value,
      isActive: true
    }
    console.log("Translation update body:", translationBody)

    await $fetch(`${backendBaseUrl}/product/${productId}/translations/${translationId.value}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authStore.jwtToken}`,
        'Content-Type': 'application/json'
      },
      body: translationBody
    })

    toast.success('Product bijgewerkt')
    router.push('/product/dashboard')
  } catch (err) {
    console.error(err)
    toast.error('Bijwerken mislukt')
  }
}
</script>

<style scoped>
.v-container {
  max-width: 700px;
  margin: auto;
}
</style>
