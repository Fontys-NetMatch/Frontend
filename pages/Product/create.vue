<!--<template>-->
<!--  <v-container>-->
<!--    <h1>Nieuw Product Aanmaken</h1>-->
<!--    <v-form @submit.prevent="createProduct" ref="formRef" v-model="formValid">-->
<!--      <v-text-field-->
<!--          v-model="form.location"-->
<!--          label="Locatie"-->
<!--          :rules="[v => !!v || 'Locatie is verplicht']"-->
<!--          required-->
<!--      ></v-text-field>-->

<!--      <v-text-field-->
<!--          v-model.number="form.taxes"-->
<!--          label="Belastingen (%)"-->
<!--          type="number"-->
<!--          :rules="[v => v > 0 || 'Belasting moet groter zijn dan 0']"-->
<!--          required-->
<!--      ></v-text-field>-->

<!--      <v-text-field-->
<!--          v-model.number="form.productType_ID"-->
<!--          label="Producttype ID"-->
<!--          type="number"-->
<!--          required-->
<!--      ></v-text-field>-->

<!--      <v-checkbox-->
<!--          v-model="form.isActive"-->
<!--          label="Is Actief"-->
<!--      ></v-checkbox>-->

<!--      <v-btn color="primary" type="submit" :loading="isSubmitting">-->
<!--        Opslaan-->
<!--      </v-btn>-->

<!--      <v-btn text to="/product/dashboard">-->
<!--        Annuleren-->
<!--      </v-btn>-->
<!--    </v-form>-->
<!--  </v-container>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { ref } from 'vue'-->
<!--import { useRouter } from 'vue-router'-->
<!--import { toast } from 'vue3-toastify'-->

<!--const router = useRouter()-->
<!--const formValid = ref(false)-->
<!--const formRef = ref()-->
<!--const isSubmitting = ref(false)-->

<!--const form = ref({-->
<!--  location: '',-->
<!--  taxes: 21,-->
<!--  isActive: true,-->
<!--  productType_ID: 1,-->
<!--})-->

<!--const createProduct = async () => {-->
<!--  if (!formValid.value || !formRef.value?.validate()) return-->

<!--  isSubmitting.value = true-->

<!--  try {-->
<!--    await $fetch('http://localhost:3000/product', {-->
<!--      method: 'POST',-->
<!--      body: form.value,-->
<!--    })-->

<!--    toast.success('Product succesvol aangemaakt!')-->
<!--    router.push('/product/dashboard')-->
<!--  } catch (err) {-->
<!--    console.error(err)-->
<!--    toast.error('Fout bij het aanmaken van product')-->
<!--  } finally {-->
<!--    isSubmitting.value = false-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--Versie met weineg velden. werkt wel met DB-->
<!--<template>-->
<!--  <v-container>-->
<!--    <h1 class="text-2xl font-semibold mb-6">Nieuw Product Aanmaken</h1>-->

<!--    <v-form @submit.prevent="submitForm">-->
<!--      <v-text-field-->
<!--          v-model="startLocation"-->
<!--          label="Startlocatie"-->
<!--          required-->
<!--          class="mb-4"-->
<!--      ></v-text-field>-->

<!--      <v-text-field-->
<!--          v-model="endLocation"-->
<!--          label="Eindlocatie"-->
<!--          required-->
<!--          class="mb-4"-->
<!--      ></v-text-field>-->

<!--      <v-select-->
<!--          v-model="productTypeId"-->
<!--          :items="productTypes"-->
<!--          item-title="name"-->
<!--          item-value="id"-->
<!--          label="Producttype"-->
<!--          required-->
<!--          class="mb-4"-->
<!--      ></v-select>-->

<!--      <v-btn type="submit" color="primary" class="mt-4">Opslaan</v-btn>-->
<!--    </v-form>-->
<!--  </v-container>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { ref } from 'vue'-->
<!--import { useRouter } from 'vue-router'-->
<!--import { toast } from 'vue3-toastify'-->

<!--const router = useRouter()-->

<!--// Form data-->
<!--const startLocation = ref('')-->
<!--const endLocation = ref('')-->
<!--const productTypeId = ref<number | null>(null)-->

<!--// Dropdown items-->
<!--const productTypes = [-->
<!--  { id: 1, name: 'Excursion' },-->
<!--  { id: 2, name: 'Activity' },-->
<!--  { id: 3, name: 'Tour' },-->
<!--  { id: 4, name: 'Flight' },-->
<!--  { id: 5, name: 'Hotel' },-->
<!--  { id: 6, name: 'Train' },-->
<!--  { id: 7, name: 'Bus' }-->
<!--]-->

<!--// Submit-->
<!--const submitForm = async () => {-->
<!--  try {-->
<!--    const body = {-->
<!--      startLocation: startLocation.value,-->
<!--      endLocation: endLocation.value,-->
<!--      productTypeId: productTypeId.value,-->
<!--      deletedAt: null-->
<!--    }-->

<!--    await $fetch('http://localhost:8213/product', {-->
<!--      method: 'POST',-->
<!--      body-->
<!--    })-->

<!--    toast.success('✅ Product succesvol aangemaakt')-->
<!--    router.push('/de/Product/dashboard') // ← pas aan als je een andere route gebruikt-->
<!--  } catch (err) {-->
<!--    console.error(err)-->
<!--    toast.error('❌ Fout bij aanmaken van product')-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.v-container {-->
<!--  max-width: 600px;-->
<!--  margin: auto;-->
<!--}-->
<!--</style>-->



<!--<template>-->
<!--  <v-container>-->
<!--    <h1 class="text-2xl font-semibold mb-6">Nieuw Product Aanmaken</h1>-->

<!--    <v-form @submit.prevent="submitForm">-->
<!--      &lt;!&ndash; 🔹 Startlocatie &ndash;&gt;-->
<!--      <v-text-field-->
<!--          v-model="startLocation"-->
<!--          label="Startlocatie"-->
<!--          required-->
<!--          class="mb-4"-->
<!--      ></v-text-field>-->

<!--      &lt;!&ndash; 🔹 Eindlocatie &ndash;&gt;-->
<!--      <v-text-field-->
<!--          v-model="endLocation"-->
<!--          label="Eindlocatie"-->
<!--          required-->
<!--          class="mb-4"-->
<!--      ></v-text-field>-->

<!--      &lt;!&ndash; 🔹 Producttype &ndash;&gt;-->
<!--      <v-select-->
<!--          v-model="productTypeId"-->
<!--          :items="productTypes"-->
<!--          item-title="name"-->
<!--          item-value="id"-->
<!--          label="Producttype"-->
<!--          required-->
<!--          class="mb-4"-->
<!--      ></v-select>-->

<!--      &lt;!&ndash; 🔹 Naam (translation) &ndash;&gt;-->
<!--      <v-text-field-->
<!--          v-model="productName"-->
<!--          label="Productnaam (EN)"-->
<!--          required-->
<!--          class="mb-4"-->
<!--      ></v-text-field>-->

<!--      &lt;!&ndash; 🔹 Omschrijving &ndash;&gt;-->
<!--      <v-textarea-->
<!--          v-model="productDescription"-->
<!--          label="Omschrijving"-->
<!--          required-->
<!--          class="mb-4"-->
<!--      ></v-textarea>-->

<!--      &lt;!&ndash; 🔹 Verstuur &ndash;&gt;-->
<!--      <v-btn type="submit" color="primary" class="mt-4">Opslaan</v-btn>-->
<!--    </v-form>-->
<!--  </v-container>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { ref } from 'vue'-->
<!--import { useRouter } from 'vue-router'-->
<!--import { toast } from 'vue3-toastify'-->

<!--const router = useRouter()-->

<!--// 🟦 Formulervelden-->
<!--const startLocation = ref('')-->
<!--const endLocation = ref('')-->
<!--const productTypeId = ref<number | null>(null)-->
<!--const productName = ref('')-->
<!--const productDescription = ref('')-->

<!--// 🟦 Dropdown types-->
<!--const productTypes = [-->
<!--  { id: 1, name: 'Excursion' },-->
<!--  { id: 2, name: 'Activity' },-->
<!--  { id: 3, name: 'Tour' },-->
<!--  { id: 4, name: 'Flight' },-->
<!--  { id: 5, name: 'Hotel' },-->
<!--  { id: 6, name: 'Train' },-->
<!--  { id: 7, name: 'Bus' }-->
<!--]-->

<!--// ✅ Versturen-->
<!--const submitForm = async () => {-->
<!--  try {-->
<!--    // 1. Maak eerst het product aan-->
<!--    const createRes = await $fetch<{ data: { id: number } }>('http://localhost:8213/product', {-->
<!--      method: 'POST',-->
<!--      body: {-->
<!--        startLocation: startLocation.value,-->
<!--        endLocation: endLocation.value,-->
<!--        productTypeId: productTypeId.value,-->
<!--        deletedAt: null-->
<!--      }-->
<!--    })-->

<!--    const productId = createRes.data.id-->

<!--    // 2. Voeg daarna de vertaling toe-->
<!--    await $fetch(`http://localhost:8213/product/${productId}/translations`, {-->
<!--      method: 'POST',-->
<!--      body: {-->
<!--        langIsoCode: 'en',-->
<!--        name: productName.value,-->
<!--        description: productDescription.value,-->
<!--        isActive: true-->
<!--      }-->
<!--    })-->

<!--    // 3. Redirect + notificatie-->
<!--    toast.success('✅ Product + vertaling succesvol aangemaakt')-->
<!--    router.push('/de/Product/dashboard')-->
<!--  } catch (err) {-->
<!--    console.error(err)-->
<!--    toast.error('❌ Fout bij aanmaken van product of vertaling')-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.v-container {-->
<!--  max-width: 700px;-->
<!--  margin: auto;-->
<!--}-->
<!--</style>-->

<!--verkeerde foutmelding en inactief producten-->
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



