<script setup lang="ts">

    import ProductFinder from "~/components/quotation/product-finder/ProductFinder.vue";
    import type ProductDate from "~/models/productDate/ProductDate";
    import QuotationItem from "~/models/quotation/QuotationItem";
    import Quotation from "~/models/quotation/Quotation";
    import Customer from "~/models/customer";
    import type QuotationProduct from "~/models/quotation/QuotationProduct";
    import ExportPdf from "~/components/quotation/PDF/ExportPdf.vue";
    import CustomerDetails from "~/components/quotation/customer/CustomerDetails.vue";

    const quotation = ref(new Quotation(
        null,
        new Customer(
            null,
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            ''
        ),
        [],
        0
    ));
    const quotationItems = ref({} as Record<string, QuotationItem[]>);

    const onProductAdd = (product: QuotationProduct, productDate: ProductDate) => {
        quotation.value.items.push(new QuotationItem(product, productDate));
        updateQuotation();
    };

    const calcTotalPrice = () => {
        quotation.value.totalPrice = 0;
        quotation.value.items.forEach(item => {
            quotation.value.totalPrice += item.productDate.price;
        });
    }

    function groupItemsByDate(quotation: Quotation): Record<string, QuotationItem[]> {
        let items = {} as Record<string, QuotationItem[]>;

        // Group items by formatted date
        quotation.items.forEach((item: QuotationItem) => {
            const date = item.productDate.startDate;
            const formattedDate = new Date(date).toLocaleDateString('nl-NL', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
            items[formattedDate] = items[formattedDate] || [];
            items[formattedDate].push(item);
        });

        // Create a new sorted object
        const sortedItems = {} as Record<string, QuotationItem[]>;

        // Sort keys by actual date objects
        Object.keys(items)
            .sort((a, b) => {
                // Convert DD-MM-YYYY to a Date object for proper comparison
                const [dayA, monthA, yearA] = a.split('-').map(Number);
                const [dayB, monthB, yearB] = b.split('-').map(Number);
                return new Date(yearA, monthA - 1, dayA).getTime() - new Date(yearB, monthB - 1, dayB).getTime();
            })
            .forEach((key) => {
                // Sort items within each date by startDate
                sortedItems[key] = items[key].sort((a, b) => {
                    return new Date(a.productDate.startDate).getTime() - new Date(b.productDate.startDate).getTime();
                });
            });
        return sortedItems;
    }

    function updateQuotation(){
        calcTotalPrice();
        quotationItems.value = groupItemsByDate(quotation.value);
    }

    function productRemoved(productId: number) {
        const index = quotation.value.items.findIndex(item => item.product.id === productId);
        if (index !== -1) {
            quotation.value.items.splice(index, 1);
            updateQuotation();
        }
    }

    function saveQuotation(){
      console.log("saveQuotation");
      console.log(quotation);



    }

    // Stepper Logic
    const step = ref(1);
    const items = ref(['Offerte Opstellen', 'Klant Gegevens', 'Afronden'])

    function onNextStep(){
      step.value = step.value + 1;

      if(step.value === 3){
        saveQuotation();
      }
    }
    function onPrevStep(){
      step.value = step.value - 1;
    }

    function sendEmail(){
      console.log("sendEmail");
    }

</script>

<template>

    <h3>Offerte Aanmaken</h3>
    <v-stepper
        prev-text="Previous"
        next-text="Next"
        v-model="step"
        :items="items"
        hide-actions
    >
        <template v-slot:item.1>
            <div class="stepper-item-panel">
                <v-row>
                    <v-col>
                        <QuotationProductItemsViewer
                            :quotation-items="quotationItems"
                            @productRemoved="productRemoved"
                        />
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
                    <v-col cols="auto">
                      <CustomerDetails :quotation />
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
                <v-row justify="end" class="w-100">
                  <v-col cols="auto">
                    <ExportPdf />
                  </v-col>
                  <v-col cols="auto">
                    <v-btn color="primary" @click="sendEmail">
                      Verstuur email
                    </v-btn>
                  </v-col>
                </v-row>
            </div>
        </template>
        <v-stepper-actions
            @click:next="onNextStep"
            @click:prev="onPrevStep"
        ></v-stepper-actions>
    </v-stepper>

</template>

<style scoped>
    .stepper-item-panel{
        max-height: calc(100vh - 282px);
    }
</style>