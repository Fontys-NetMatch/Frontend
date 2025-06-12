<template>
  <v-form @submit.prevent="submitForm" ref="formRef">
    <v-text-field
        v-model="form.location"
        label="Locatie"
        :rules="[rules.required]"
        required
    />

    <v-text-field
        v-model.number="form.taxes"
        label="Belastingen (%)"
        type="number"
        :rules="[rules.required, rules.taxRange]"
        required
    />

    <v-select
        v-model="form.productType_ID"
        :items="productTypes"
        item-title="name"
        item-value="id"
        label="Producttype"
        :rules="[rules.required]"
        required
    />

    <v-switch
        v-model="form.isActive"
        label="Actief"
    />

    <v-btn type="submit" color="primary" class="mt-4">
      {{ submitButtonLabel }}
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

// Props
const props = defineProps<{
  modelValue?: ProductFormData,
  submitButtonLabel?: string,
  productTypes: { id: number; name: string }[]
}>()

const emit = defineEmits<{
  (e: 'submit', value: ProductFormData): void
}>()

// Form state
interface ProductFormData {
  location: string
  taxes: number
  isActive: boolean
  productType_ID: number
}

const form = ref<ProductFormData>({
  location: '',
  taxes: 0,
  isActive: true,
  productType_ID: 0
})

// Form validatie
const formRef = ref()
const rules = {
  required: (v: any) => !!v || 'Verplicht veld',
  taxRange: (v: number) =>
      (v >= 0 && v <= 100) || 'Belasting moet tussen 0 en 100 zijn'
}

watch(() => props.modelValue, (val) => {
  if (val) {
    form.value = { ...val }
  }
}, { immediate: true })

const submitForm = () => {
  const isValid = formRef.value?.validate?.()
  if (!isValid) return

  emit('submit', form.value)
}
</script>
