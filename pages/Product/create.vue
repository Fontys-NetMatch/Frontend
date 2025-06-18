<template>
  <v-container>
    <h1>Nieuw Product Aanmaken</h1>

    <v-form @submit.prevent="submitForm">
      <!-- Startlocatie -->
      <v-text-field v-model="startLocation" label="Startlocatie" required></v-text-field>

      <!-- Eindlocatie -->
      <v-text-field v-model="endLocation" label="Eindlocatie" required></v-text-field>

      <!-- Producttype -->
      <v-select
          v-model="productTypeId"
          :items="availableTypes"
          item-value="id"
          item-title="name"
          label="Producttype"
          required
      ></v-select>

      <!-- Vertaling -->
      <v-text-field v-model="name" label="Productnaam (EN)" required></v-text-field>
      <v-textarea v-model="description" label="Beschrijving (EN)" required></v-textarea>

      <v-btn type="submit" color="primary" class="mt-4">Opslaan</v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRuntimeConfig } from '#app'
import { toast } from 'vue3-toastify'
import { useAuthStore } from '~/store/auth'

// ✅ Interfaces
interface CreateProductResponse {
  newId: number
  message: string
  success: boolean
  statusCode: number
  statusDescription: string
}

// ✅ Reactives
const startLocation = ref('')
const endLocation = ref('')
const productTypeId = ref<number | null>(null)
const name = ref('')
const description = ref('')

const availableTypes = ref([
  { id: 1, name: 'Excursion' },
  { id: 2, name: 'Activity' },
  { id: 3, name: 'Tour' },
  { id: 4, name: 'Flight' },
  { id: 5, name: 'Hotel' },
  { id: 6, name: 'Train' },
  { id: 7, name: 'Bus' }
])

const authStore = useAuthStore()
const config = useRuntimeConfig()
const backendBaseUrl = config.public.backendBaseUrl || 'http://localhost:8213'
const router = useRouter()

// ✅ Form verzenden
const submitForm = async () => {
  try {
    // 1. Product aanmaken
    const productRes = await $fetch<CreateProductResponse>(`${backendBaseUrl}/product`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authStore.jwtToken}`,
        'Content-Type': 'application/json'
      },
      body: {
        startLocation: startLocation.value,
        endLocation: endLocation.value,
        productTypeId: productTypeId.value,
        deletedAt: null
      }
    })

    const productId = productRes.newId

    // 2. Translation aanmaken
    await $fetch(`${backendBaseUrl}/product/${productId}/translations`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authStore.jwtToken}`,
        'Content-Type': 'application/json'
      },
      body: {
        langIsoCode: 'en',
        name: name.value,
        description: description.value,
        isActive: true
      }
    })

    toast.success('Product succesvol aangemaakt')
    router.push('/Product/dashboard')
  } catch (error) {
    console.error(error)
    toast.error('Fout bij aanmaken van product')
  }
}
</script>

<style scoped>
.v-container {
  max-width: 600px;
  margin: auto;
}
</style>



