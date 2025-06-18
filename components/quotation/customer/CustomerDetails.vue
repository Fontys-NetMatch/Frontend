<template>
  <div style="margin-left: 20px; min-height: 100vh;">
        <h3>Customer Details</h3>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
                v-model="customer.firstname"
                :rules="[rules.required]"
                label="Firstname"
                required
            ></v-text-field>
            <v-text-field
                v-model="customer.surname"
                :rules="[rules.required]"
                label="Surname"
                required
            ></v-text-field>
            <v-text-field
                v-model="customer.email"
                :rules="[rules.required, rules.email]"
                label="Email"
                required
            ></v-text-field>
            <v-text-field
                v-model="customer.phone"
                label="Phone"
            ></v-text-field>
           
        </v-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Customer from '~/models/customer';

const valid = ref(false);
const customer = ref(new Customer(0, '', '', '', null));

const rules = {
    required: (value: any) => !!value || 'Required.',
    email: (value: any) => {
        const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        return pattern.test(value) || 'Invalid e-mail.';
    }
};

const submitCustomer = async () => {
    if (valid.value) {
        try {
            const response = await fetch('/customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer.value),
            });
            if (response.ok) {
                console.log('Customer created successfully');
                // Optionally reset the form or handle success
            } else {
                console.error('Failed to create customer');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
