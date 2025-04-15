<script setup lang="ts">

    import ProductFinder from "~/components/quotation/product-finder/ProductFinder.vue";

    const quotation = ref({
        id: 432498326437,
        customer: {
            name: 'John Doe',
            address: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zip: '12345'
        },
        items: [
            { description: 'Item 1', quantity: 1, price: 100 },
            { description: 'Item 2', quantity: 2, price: 200 }
        ],
        totalPrice: 500
    });

    const onProductAdd = () => {
        console.log("Product added");
    };

</script>

<template>

    <h3>Offerte #{{ quotation.id }}</h3>
    <v-stepper
        prev-text="Previous"
        next-text="Next"
        editable
        :items="['Offerte Opstellen', 'Klant Gegevens', 'Afronden']"
    >
        <template v-slot:item.1>
            <div class="stepper-item-panel">
                <v-row>
                    <v-col>
                        Offerte
                    </v-col>
                    <v-col cols="auto">
                        <ProductFinder
                            :on-product-add="onProductAdd"
                        ></ProductFinder>
                    </v-col>
                </v-row>
            </div>
        </template>

        <template v-slot:item.2 class="stepper-item-panel">
            <div class="stepper-item-panel">
                <v-row>
                    <v-col>
                        Klant Gegevens
                    </v-col>
                    <v-col cols="auto">

                    </v-col>
                </v-row>
            </div>
        </template>

        <template v-slot:item.3 class="stepper-item-panel">
            <div class="stepper-item-panel">
                <v-row>
                    <v-col>
                        Afronden
                    </v-col>
                    <v-col cols="auto">
                        Overzicht offerte met totaal prijs
                    </v-col>
                </v-row>
            </div>
        </template>
    </v-stepper>

</template>

<style scoped>
    .stepper-item-panel{
        max-height: calc(100vh - 282px);
    }
</style>