<template>
  <v-container>
    <h1>Product Bewerken</h1>
    <v-form @submit.prevent="updateProduct" ref="formRef" v-model="formValid">
      <v-text-field
          v-model="form.location"
          label="Locatie"
          :rules="[v => !!v || 'Locatie is verplicht']"
          required
      ></v-text-field>

      <v-text-field
          v-model.number="form.taxes"
          label="Belastingen (%)"
          type="number"
          :rules="[v => v > 0 || 'Belasting moet groter zijn dan 0']"
          required
      ></v-text-field>

      <v-text-field
          v-model.number="form.productType_ID"
          label="Producttype ID"
          type="number"
          required
      ></v-text-field>

      <v-checkbox
          v-model="form.isActive"
          label="Is Actief"
      ></v-checkbox>

      <v-btn color="primary" type="submit" :loading="isSubmitting">
        Opslaan
      </v-btn>

      <v-btn text to="/product/dashboard">
        Annuleren
      </v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

// ✅ TypeScript interface voor product
interface Product {
  id: number
  location: string
  taxes: number
  deletedAt?: string | null
  isActive: boolean
  productType_ID: number
}

const router = useRouter()
const route = useRoute()
const id = route.params.id as string

const formValid = ref(false)
const formRef = ref()
const isSubmitting = ref(false)

const form = ref<Omit<Product, 'id' | 'deletedAt'>>({
  location: '',
  taxes: 21,
  isActive: true,
  productType_ID: 1,
})

// ✅ Ophalen van bestaand product
onMounted(async () => {
  try {
    const product = await $fetch<Product>(`http://localhost:3000/product/${id}`)
    form.value = {
      location: product.location,
      taxes: product.taxes,
      isActive: product.isActive,
      productType_ID: product.productType_ID,
    }
  } catch (err) {
    console.error(err)
    toast.error('Product niet gevonden')
    router.push('/product/dashboard')
  }
})

// ✅ Updaten van het product
const updateProduct = async () => {
  if (!formValid.value || !formRef.value?.validate()) return

  isSubmitting.value = true

  try {
    await $fetch(`http://localhost:3000/product/${id}`, {
      method: 'PUT',
      body: form.value,
    })

    toast.success('Product succesvol bijgewerkt!')
    router.push('/product/dashboard')
  } catch (err) {
    console.error(err)
    toast.error('Bijwerken mislukt')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.v-card-title {
  align-items: center;
}
</style>
