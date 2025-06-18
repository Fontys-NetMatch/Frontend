<script setup lang="ts">

    import ProductFinder from "~/components/quotation/product-finder/ProductFinder.vue";
    import type ProductDate from "~/models/productDate/ProductDate";
    import QuotationItem from "~/models/quotation/QuotationItem";
    import Quotation from "~/models/quotation/Quotation";
    import Customer from "~/models/customer";
    import type QuotationProduct from "~/models/quotation/QuotationProduct";
    import ExportPdf from "~/components/quotation/PDF/ExportPdf.vue";
    import CustomerDetails from "~/components/quotation/customer/CustomerDetails.vue";
    import html2pdf from 'html2pdf.js';
    import { ref , nextTick} from 'vue';


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




    const exportToPDF = () => {
      const element = document.getElementById('quotation-pdf');
      if (!element) return;


      setTimeout(() => {
        import('html2pdf.js').then((html2pdf) => {
          html2pdf.default()
              .set({
                margin: 0.5,
                filename: 'offerte.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
              })
              .from(element)
              .save()
              .then(() => {
              });
        });
      }, 100); // slight delay to ensure rendering
    };

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
                    <div>
                      <v-btn @click="exportToPDF">📄 Exporteer als PDF</v-btn>

                      <!-- Printable content -->
                      <div
                          id="quotation-pdf"
                      >
                        <h1>Offerte</h1>
                        <p><strong>Klant:</strong> {{ quotation.customer.firstname }} {{ quotation.customer.surname }}</p>
                        <p><strong>Email:</strong> {{ quotation.customer.email }}</p>

                        <h2>Producten</h2>
                        <div v-for="(item, index) in quotation.items" :key="index" style="margin-bottom: 1rem;">
                          <h3>{{ item.product.name }}</h3>
                          <p><strong>Type:</strong> {{ item.product.type.name }}</p>
                          <p><strong>Beschrijving:</strong> {{ item.product.description || 'Geen beschrijving' }}</p>
                          <p><strong>Prijs:</strong> €{{ item.productDate.price }}</p>
                          <p><strong>Van:</strong> {{ item.product.startLocation }} <strong>naar</strong> {{ item.product.endLocation }}</p>
                          <p><strong>Tags:</strong> {{ item.product.tags.join(', ') }}</p>
                        </div>

                        <h2>Totaalprijs: €{{ quotation.totalPrice }}</h2>
                      </div>
                    </div>
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