<script setup lang="ts">
  import { ref } from 'vue';
  import Quotation from "~/models/quotation/Quotation.js";

  const props = defineProps({
    quotation: {
      type: Quotation,
      required: true,
    }
  });

  const valid = ref(false);

  const rules = {
    required: (value: any) => !!value || 'Required.',
    email: (value: any) => {
      const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      return pattern.test(value) || 'Invalid e-mail.';
    }
  };
</script>

<template>
    <div>
        <h3>Customer Details</h3>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
                v-model="props.quotation.customer.firstname"
                :rules="[rules.required]"
                label="Firstname"
                required
            ></v-text-field>
            <v-text-field
                v-model="props.quotation.customer.surname"
                :rules="[rules.required]"
                label="Surname"
                required
            ></v-text-field>
            <v-text-field
                v-model="props.quotation.customer.email"
                :rules="[rules.required, rules.email]"
                label="Email"
                required
            ></v-text-field>
            <v-text-field
                v-model="props.quotation.customer.phone"
                label="Phone"
            ></v-text-field>
        </v-form>
    </div>
</template>
