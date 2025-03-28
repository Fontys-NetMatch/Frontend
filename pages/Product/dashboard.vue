<template>
  <v-container>
    <h1>Producten Dashboard</h1>
    <v-card>
      <v-card-title>
        Producten
        <v-spacer></v-spacer>
        <!-- Knop naar de create-pagina -->
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
          class="elevation-1"
      >
        <template v-slot:item.isActive="{ item }">
          <v-chip :color="item.isActive ? 'green' : 'red'" text-color="white">
            {{ item.isActive ? 'Actief' : 'Inactief' }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn color="primary" small @click="editProduct(item)">Bewerken</v-btn>
          <v-btn color="red" small @click="deleteProduct(item)">Verwijderen</v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Definieer de kolomkoppen
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Locatie', key: 'location' },
  { title: 'Belastingen', key: 'taxes' },
  { title: 'Verwijderd op', key: 'deletedAt' },
  { title: 'Actief', key: 'isActive' },
  { title: 'Producttype ID', key: 'productType_ID' },
  { title: 'Acties', key: 'actions', sortable: false }
]

// Reactieve variabelen
const search = ref('')
const isLoading = ref(true)
const products = ref([])

// Data ophalen van de back-end
const { data, error } = await useFetch('http://localhost:3000/api/products', {
  onRequest() {
    isLoading.value = true
  },
  onRequestError() {
    toast.error('Fout bij het ophalen van producten')
  },
  onResponse() {
    isLoading.value = false
  }
})

if (data.value) {
  products.value = data.value
} else if (error.value) {
  console.error('API-fout:', error.value)
}

// Functies
const editProduct = (item) => {
  console.log('Bewerk product:', item)
}

const deleteProduct = async (item) => {
  if (confirm('Weet je het zeker?')) {
    await $fetch(`http://localhost:3000/api/products/${item.id}`, { method: 'DELETE' })
    products.value = products.value.filter(p => p.id !== item.id)
    toast.success('Product verwijderd')
  }
}

// Toast importeren
import { toast } from 'vue3-toastify'
</script>