<script setup lang="ts">

    import ProductFinder from "~/components/quotation/create/ProductFinder.vue";
    import { useI18n } from 'vue-i18n';
    const { t } = useI18n();

    const quotation = ref({
        id: 432498326437,
        customer: {
            name: t('john-doe'),
            address: t('123-main-st'),
            city: t('anytown'),
            state: 'CA',
            zip: '12345'
        },
        items: [
            { description: t('item-1'), quantity: 1, price: 100 },
            { description: t('item-2'), quantity: 2, price: 200 }
        ],
        totalPrice: 500
    });

    const onProductAdd = () => {
        console.log("Product added");
    };

</script>

<template>

    <h3>{{ $t('offerte-quotation-id', [quotation.id]) }}</h3>
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
                        {{ t('offerte') }} </v-col>
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
                        {{ t('klant-gegevens') }} </v-col>
                    <v-col cols="auto">

                    </v-col>
                </v-row>
            </div>
        </template>

        <template v-slot:item.3 class="stepper-item-panel">
            <div class="stepper-item-panel">
                <v-row>
                    <v-col>
                        {{ t('afronden') }} </v-col>
                    <v-col cols="auto">
                        {{ t('overzicht-offerte-met-totaal-prijs') }} </v-col>
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