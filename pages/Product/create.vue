<template>
  <v-container>
    <h1>Nieuw Product Aanmaken</h1>
    <v-form @submit.prevent="createProduct" ref="formRef" v-model="formValid">
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const router = useRouter()
const formValid = ref(false)
const formRef = ref()
const isSubmitting = ref(false)

const form = ref({
  location: '',
  taxes: 21,
  isActive: true,
  productType_ID: 1,
})

const createProduct = async () => {
  if (!formValid.value || !formRef.value?.validate()) return

  isSubmitting.value = true

  try {
    await $fetch('http://localhost:3000/product', {
      method: 'POST',
      body: form.value,
    })

    toast.success('Product succesvol aangemaakt!')
    router.push('/product/dashboard')
  } catch (err) {
    console.error(err)
    toast.error('Fout bij het aanmaken van product')
  } finally {
    isSubmitting.value = false
  }
}
</script>
