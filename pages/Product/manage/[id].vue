<template>
  <v-container>
    <h1>Product bewerken</h1>

    <v-form v-if="product" @submit.prevent="submitForm">
      <v-text-field
          v-model="productName"
          label="Productnaam"
          required
      />

      <v-textarea
          v-model="productDescription"
          label="Omschrijving"
          required
      />

      <v-select
          v-model="selectedProductTypeId"
          :items="availableTypes"
          item-title="title"
          item-value="value"
          label="Producttype"
          required
      />

      <v-text-field
          v-model="startLocation"
          label="Vertrekplaats"
          required
      />

      <v-text-field
          v-model="endLocation"
          label="Bestemming"
      />

      <v-btn type="submit" color="primary" class="mt-4">Opslaan</v-btn>
    </v-form>

    <v-alert v-else type="info" title="Laden...">
      Productgegevens worden opgehaald...
    </v-alert>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRuntimeConfig } from '#app'
import { useI18n } from 'vue-i18n'
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

interface ProductResponse {
  success: boolean
  id: number
  startLocation: string
  endLocation: string
  deletedAt: string | null
  productType: ProductType
  translations: ProductTranslation[]
}

interface ProductTypesResponse {
  success: boolean
  productTypes: ProductType[]
}

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const config = useRuntimeConfig()
const { locale } = useI18n()
const backendBaseUrl = config.public.backendBaseUrl || 'http://localhost:8213'

const productId = Number(route.params.id)

// Formvelden
const product = ref<ProductResponse | null>(null)
const productName = ref('')
const productDescription = ref('')
const startLocation = ref('')
const endLocation = ref('')
const selectedProductTypeId = ref<number | null>(null)

const productTypes = ref<ProductType[]>([])
const availableTypes = ref<{ title: string, value: number }[]>([])

// ✅ Producttypes ophalen
const fetchProductTypes = async () => {
  try {
    const response = await $fetch<ProductTypesResponse>(`${backendBaseUrl}/product-type`, {
      headers: {
        Authorization: `Bearer ${authStore.jwtToken}`
      }
    })

    if (response.success && Array.isArray(response.productTypes)) {
      productTypes.value = response.productTypes
      availableTypes.value = response.productTypes.map(pt => {
        const translation = pt.translations.find(t => t.langIsoCode === locale.value) || pt.translations[0]
        return {
          title: translation?.name || '—',
          value: pt.id
        }
      })
    }
  } catch (e) {
    toast.error('Kon producttypes niet laden')
  }
}

// ✅ Product ophalen
const fetchProduct = async () => {
  try {
    const response = await $fetch<ProductResponse>(`${backendBaseUrl}/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${authStore.jwtToken}`
      }
    })

    if (response.success) {
      product.value = response
      const translation = response.translations.find(t => t.langIsoCode === locale.value) || response.translations[0]

      productName.value = translation?.name || ''
      productDescription.value = translation?.description || ''
      startLocation.value = response.startLocation || ''
      endLocation.value = response.endLocation || ''
      selectedProductTypeId.value = response.productType?.id || null
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

// ✅ Form versturen
const submitForm = async () => {
  if (!selectedProductTypeId.value) {
    toast.error('Kies een producttype')
    return
  }

  try {
    await $fetch(`${backendBaseUrl}/product/${productId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authStore.jwtToken}`
      },
      body: {
        startLocation: startLocation.value,
        endLocation: endLocation.value,
        productTypeId: selectedProductTypeId.value,
        deletedAt: new Date().toISOString()
      }
    })

    toast.success('Product succesvol bijgewerkt')
    router.push('/product/dashboard')
  } catch (err) {
    console.error(err)
    toast.error('Bijwerken mislukt')
  }
}

// ✅ Init
onMounted(async () => {
  await fetchProductTypes()
  await fetchProduct()
})
</script>

<style scoped>
.v-container {
  max-width: 700px;
  margin: auto;
}
</style>
