<template>
  <v-container>
    <h1>Nieuw Product Aanmaken</h1>
    <v-card>
      <v-card-title>Productgegevens</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="createProduct">
          <v-text-field
              v-model="newProduct.location"
              label="Locatie"
              :rules="[v => !!v || 'Locatie is verplicht']"
              required
          ></v-text-field>
          <v-text-field
              v-model.number="newProduct.taxes"
              label="Belastingen"
              type="number"
              step="0.01"
              :rules="[v => v >= 0 || 'Belastingen moeten positief zijn']"
              required
          ></v-text-field>
          <v-checkbox
              v-model="newProduct.isActive"
              label="Actief"
          ></v-checkbox>
          <v-text-field
              v-model.number="newProduct.productType_ID"
              label="Producttype ID"
              type="number"
              :rules="[v => v > 0 || 'Producttype ID moet groter zijn dan 0']"
              required
          ></v-text-field>
          <v-btn type="submit" color="primary" :disabled="isSubmitting">Opslaan</v-btn>
          <v-btn color="grey" text to="/products" class="ml-2">Annuleren</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Reactieve variabelen
const newProduct = ref({
  location: '',
  taxes: 0,
  isActive: true,
  productType_ID: 0,
  deletedAt: new Date().toISOString()
})
const isSubmitting = ref(false)
const router = useRouter()

// Functie om product aan te maken
const createProduct = async () => {
  isSubmitting.value = true
  try {
    const response = await $fetch('http://localhost:3000/api/products', {
      method: 'POST',
      body: newProduct.value
    })
    toast.success('Product aangemaakt')
    router.push('/products')
  } catch (err) {
    toast.error('Fout bij het aanmaken van product')
    console.error(err)
  } finally {
    isSubmitting.value = false
  }
}

// Toast importeren
import { toast } from 'vue3-toastify'
</script>