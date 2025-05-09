<script setup lang="ts">
    import {useToastStore} from "~/store/toast";
    import debounce from "lodash.debounce"
    import ProductType from "~/models/productType/ProductType";
    import QuotationProduct from "~/models/quotation/QuotationProduct";
    import type ProductDate from "~/models/productDate/ProductDate";
    import type Product from "~/models/product/Product";
    import ProductService from "~/services/productService";
    import ProductTypeService from "~/services/productTypeService";
    import QuotationProductType from "~/models/quotation/QuotationProductType";

    const props = defineProps({
        onProductAdd: {
            type: Function as PropType<(product: QuotationProduct, productDate: ProductDate) => void>,
            required: true
        }
    });
    const { toast } = useToastStore();

    const toCurrency = (value: number) =>
        Number(value).toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' });

    const productTypes = ref([] as {
        value: number;
        title: string;
    }[]);
    const products = ref([] as QuotationProduct[]);

    const selectedProductType = ref(-1);
    const filterMenu = ref(false);
    const productTypeSearch = ref('');
    const debouncedSearchQuery = debounce(() => {
        fetchProducts();
    }, 500);

    const startDateFilterTemp = ref('');
    const endDateFilterTemp = ref('');
    const priceRangeFilterTemp = ref([0, 1000]);
    const minPersonCountFilterTemp = ref(1);

    const startDateFilter = ref('');
    const endDateFilter = ref('');
    const priceRangeFilter = ref([0, 1000]);
    const minPersonCountFilter = ref(1);

    const fetchProductTypes = () => {

        ProductTypeService.getProductTypes().then((response: ProductType[] | null) => {
            if(response === null){
                toast('Error getting product types', 'error');
                return;
            }

            productTypes.value.push({
                value: -1,
                title: "All Product Types",
            });

            response.forEach((productType: ProductType) => {
                let translation = productType.translations.find(translation => translation.langIsoCode === "en");
                if(translation === undefined){
                    return;
                }

                productTypes.value.push({
                    value: productType.id,
                    title: translation.name,
                });
            });
        });
    }

    const fetchProducts = () => {
        let queryParams = {} as {
            typeId: number|undefined,
            startDateTime: string|undefined,
            endDateTime: string|undefined,
            minPrice: number|undefined,
            maxPrice: number|undefined,
            minPeople: number|undefined,
            searchQuery: string|undefined
        };
        if(selectedProductType.value != -1){
            queryParams['typeId'] = selectedProductType.value;
        }
        if(startDateFilter.value.length > 0){
            queryParams['startDateTime'] = startDateFilter.value;
        }
        if(endDateFilter.value.length > 0){
            queryParams['endDateTime'] = endDateFilter.value;
        }
        if(priceRangeFilter.value.length > 0){
            queryParams['minPrice'] = priceRangeFilter.value[0];
            queryParams['maxPrice'] = priceRangeFilter.value[1];
        }
        if(minPersonCountFilter.value > 0){
            queryParams['minPeople'] = minPersonCountFilter.value;
        }
        if(productTypeSearch.value.length > 0){
            queryParams['searchQuery'] = productTypeSearch.value;
        }

        ProductService.getProducts(queryParams).then(response => {
            if(response === null){
                toast('Error getting products', 'error');
                return;
            }

            products.value = [];
            response?.forEach((p: Product) => {
                let translation = p.translations.find(translation => translation.langIsoCode === "en");
                if(translation === undefined){
                    return;
                }

                let productTypeTranslation = p.productType.translations.find(translation => translation.langIsoCode === "en");
                if(productTypeTranslation === undefined){
                    return;
                }

                let minPrice = Math.min(...p.dates.map((date: ProductDate) => date.price));
                let maxPrice = Math.max(...p.dates.map((date: ProductDate) => date.price));

                products.value.push(new QuotationProduct(
                    p.id,
                    translation.name,
                    translation.description,
                    new QuotationProductType(
                        p.productType.id,
                        productTypeTranslation.langIsoCode,
                        productTypeTranslation.name,
                        productTypeTranslation.isActive
                    ),
                    translation.tags,
                    p.startLocation,
                    p.endLocation,
                    minPrice,
                    maxPrice,
                    p.dates
                ));
            })
        });
    }

    const resetFilters = () => {
        // Close the filter menu
        filterMenu.value = false;

        startDateFilterTemp.value = '';
        endDateFilterTemp.value = '';
        priceRangeFilterTemp.value = [0, 1000];
        minPersonCountFilterTemp.value = 1;

        startDateFilter.value = '';
        endDateFilter.value = '';
        priceRangeFilter.value = [0, 1000];
        minPersonCountFilter.value = 1;
    }
    const applyFilters = () => {
        // Close the filter menu
        filterMenu.value = false;

        startDateFilter.value = startDateFilterTemp.value;
        endDateFilter.value = endDateFilterTemp.value;
        priceRangeFilter.value = priceRangeFilterTemp.value;
        minPersonCountFilter.value = minPersonCountFilterTemp.value;
    }

    fetchProductTypes();
    fetchProducts();

    watch([selectedProductType, startDateFilter, endDateFilter, priceRangeFilter, minPersonCountFilter], () => {
        fetchProducts();
    });

    const selectProductDate = (product: QuotationProduct, productDate: ProductDate) => {
        if(props.onProductAdd === undefined){
            throw new Error("onProductAdd is not defined");
        }
        props.onProductAdd(product, productDate);
    }

</script>

<template>
    <div class="product-finder">
        <v-row>
            <v-col class="pr-0">
                <v-select
                    label="Select Product Type"
                    v-model="selectedProductType"
                    :items="productTypes"
                    hide-details
                ></v-select>
            </v-col>
            <v-col class="pl-2" cols="auto">
                <v-menu
                    v-model="filterMenu"
                    :close-on-content-click="false"
                >
                    <template v-slot:activator="{ props }">
                        <v-btn
                            icon="mdi-filter"
                            rounded
                            width="56"
                            height="56"
                            v-bind="props"
                        ></v-btn>
                    </template>

                    <v-card min-width="450" width="fit-content">
                        <v-card-text>
                            <div>
                                <v-label>
                                    Start Date
                                </v-label>
                                <v-text-field
                                    v-model="startDateFilterTemp"
                                    type="date"
                                    hide-details
                                ></v-text-field>
                            </div>
                            <div class="mt-2">
                                <v-label>
                                    End Date
                                </v-label>
                                <v-text-field
                                    v-model="endDateFilterTemp"
                                    type="date"
                                    hide-details
                                ></v-text-field>
                            </div>
                            <div class="mt-2">
                                <v-label>
                                    Price Range
                                </v-label>
                                <v-range-slider
                                    v-model="priceRangeFilterTemp"
                                    :max="1000"
                                    :min="0"
                                    :step="1"
                                    class="align-center mx-0"
                                    hide-details
                                >
                                    <template v-slot:prepend>
                                        <v-text-field
                                            v-model="priceRangeFilterTemp[0]"
                                            density="compact"
                                            style="width: 85px"
                                            type="number"
                                            variant="outlined"
                                            hide-details
                                            single-line
                                        ></v-text-field>
                                    </template>
                                    <template v-slot:append>
                                        <v-text-field
                                            v-model="priceRangeFilterTemp[1]"
                                            density="compact"
                                            style="width: 85px"
                                            type="number"
                                            variant="outlined"
                                            hide-details
                                            single-line
                                        ></v-text-field>
                                    </template>
                                </v-range-slider>
                            </div>
                            <div class="mt-2">
                                <v-label>
                                    Min. Aantal Personen
                                </v-label>
                                <v-text-field
                                    v-model="minPersonCountFilterTemp"
                                    :min="1"
                                    type="number"
                                    hide-details
                                ></v-text-field>
                            </div>

                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
                                color="danger"
                                @click="resetFilters"
                            >
                                Clear
                            </v-btn>
                            <v-btn
                                color="primary"
                                @click="applyFilters"
                            >
                                Apply
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-menu>
            </v-col>
        </v-row>
        <v-text-field
            class="mt-2"
            placeholder="Search..."
            hide-details
            v-model="productTypeSearch"
            @input="debouncedSearchQuery"
        ></v-text-field>

        <v-divider></v-divider>

        <v-list
            style="height: calc(100vh - 450px); overflow-y: auto;"
        >
            <template v-if="products.length > 0">
                <v-list-item
                    v-for="(item, index) in products"
                    :key="index"
                    class="px-0"
                >
                    <v-card
                        variant="tonal"
                        class="w-100"
                    >
                        <v-card-title>
                            <v-row>
                                <v-col>
                                    {{ item.name }}
                                </v-col>
                                <v-col cols="auto">
                                    <v-chip
                                        color="primary"
                                        text-color="white"
                                    >
                                        <template v-if="item.minPrice == item.maxPrice">
                                            {{ toCurrency(item.minPrice) }}
                                        </template>
                                        <template v-else>
                                            {{ toCurrency(item.minPrice) }} - {{ toCurrency(item.maxPrice) }}
                                        </template>
                                    </v-chip>
                                </v-col>
                            </v-row>
                        </v-card-title>
                        <v-card-subtitle>
                            {{ item.description }}
                        </v-card-subtitle>
                        <v-card-text>
                            <v-row>
                                <v-col v-if="item.startLocation != null">
                                    <h6>Departure:</h6>
                                    <span>{{ item.startLocation }}</span>
                                </v-col>
                                <v-col v-if="item.endLocation != null">
                                    <h6>Arrival:</h6>
                                    <span>{{ item.endLocation }}</span>
                                </v-col>
                            </v-row>
                            <div class="d-flex gap-1 mt-3">
                                <v-chip
                                    color="primary"
                                    text-color="white"
                                    size="small"
                                >
                                    {{ item.type.name }}
                                </v-chip>
                                <v-chip
                                    text-color="white"
                                    size="small"
                                    v-for="tag in item.tags"
                                >
                                    {{ tag }}
                                </v-chip>
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-dialog max-width="500">
                                <template v-slot:activator="{ props: activatorProps }">
                                    <v-btn
                                        color="primary"
                                        v-bind="activatorProps"
                                    >
                                        Add to Quotation
                                    </v-btn>
                                </template>

                                <template v-slot:default="{ isActive }">
                                    <v-card>
                                        <v-card-title>
                                            <v-row>
                                                <v-col>
                                                    Select Time Slot
                                                </v-col>
                                                <v-col cols="auto">
                                                    <v-btn
                                                        icon
                                                        @click="isActive.value = false"
                                                        class="ml-auto bg-transparent"
                                                        variant="plain"
                                                    >
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-card-title>
                                        <v-card-text class="date-select-content">
                                            <v-card
                                                v-for="itemDate in item.dates"
                                                :key="itemDate.id"
                                                class="mb-2"
                                                hover
                                                @click="isActive.value = false;selectProductDate(item, itemDate)"
                                            >
                                                <v-card-title>
                                                    <v-row>
                                                        <v-col>
                                                            <NuxtTime
                                                                :datetime="itemDate.startDate"
                                                                month="long"
                                                                day="numeric"
                                                                year="numeric"
                                                            />
                                                        </v-col>
                                                        <v-col cols="auto">
                                                            <v-chip
                                                                color="primary"
                                                                text-color="white"
                                                            >
                                                                {{ itemDate.price }}
                                                            </v-chip>
                                                        </v-col>
                                                    </v-row>
                                                </v-card-title>
                                                <v-card-text>
                                                    <v-row>
                                                        <v-col v-if="itemDate.startDate != null">
                                                            <h6>Departure:</h6>
                                                            <span>
                                                                <NuxtTime
                                                                    :datetime="itemDate.startDate"
                                                                    month="long"
                                                                    day="numeric"
                                                                    year="numeric"
                                                                />
                                                            </span>
                                                        </v-col>
                                                        <v-col v-if="itemDate.endDate != null">
                                                            <h6>Arrival:</h6>
                                                            <span>
                                                                <NuxtTime
                                                                    :datetime="itemDate.endDate"
                                                                    month="long"
                                                                    day="numeric"
                                                                    year="numeric"
                                                                />
                                                            </span>
                                                        </v-col>
                                                    </v-row>
                                                </v-card-text>
                                            </v-card>
                                            <v-card
                                                v-for="itemDate in item.dates"
                                                :key="itemDate.id"
                                                class="mb-2"
                                                hover
                                                @click="isActive.value = false;selectProductDate(item, itemDate)"
                                            >
                                                <v-card-title>
                                                    <v-row>
                                                        <v-col>
                                                            <NuxtTime
                                                                :datetime="itemDate.startDate"
                                                                month="long"
                                                                day="numeric"
                                                                year="numeric"
                                                            />
                                                        </v-col>
                                                        <v-col cols="auto">
                                                            <v-chip
                                                                color="primary"
                                                                text-color="white"
                                                            >
                                                                {{ itemDate.price }}
                                                            </v-chip>
                                                        </v-col>
                                                    </v-row>
                                                </v-card-title>
                                                <v-card-text>
                                                    <v-row>
                                                        <v-col v-if="itemDate.startDate != null">
                                                            <h6>Departure:</h6>
                                                            <span>
                                                                <NuxtTime
                                                                    :datetime="itemDate.startDate"
                                                                    month="long"
                                                                    day="numeric"
                                                                    year="numeric"
                                                                />
                                                            </span>
                                                        </v-col>
                                                        <v-col v-if="itemDate.endDate != null">
                                                            <h6>Arrival:</h6>
                                                            <span>
                                                                <NuxtTime
                                                                    :datetime="itemDate.endDate"
                                                                    month="long"
                                                                    day="numeric"
                                                                    year="numeric"
                                                                />
                                                            </span>
                                                        </v-col>
                                                    </v-row>
                                                </v-card-text>
                                            </v-card>
                                            <v-card
                                                v-for="itemDate in item.dates"
                                                :key="itemDate.id"
                                                class="mb-2"
                                                hover
                                                @click="isActive.value = false;selectProductDate(item, itemDate)"
                                            >
                                                <v-card-title>
                                                    <v-row>
                                                        <v-col>
                                                            <NuxtTime
                                                                :datetime="itemDate.startDate"
                                                                month="long"
                                                                day="numeric"
                                                                year="numeric"
                                                            />
                                                        </v-col>
                                                        <v-col cols="auto">
                                                            <v-chip
                                                                color="primary"
                                                                text-color="white"
                                                            >
                                                                {{ itemDate.price }}
                                                            </v-chip>
                                                        </v-col>
                                                    </v-row>
                                                </v-card-title>
                                                <v-card-text>
                                                    <v-row>
                                                        <v-col v-if="itemDate.startDate != null">
                                                            <h6>Departure:</h6>
                                                            <span>
                                                                <NuxtTime
                                                                    :datetime="itemDate.startDate"
                                                                    month="long"
                                                                    day="numeric"
                                                                    year="numeric"
                                                                />
                                                            </span>
                                                        </v-col>
                                                        <v-col v-if="itemDate.endDate != null">
                                                            <h6>Arrival:</h6>
                                                            <span>
                                                                <NuxtTime
                                                                    :datetime="itemDate.endDate"
                                                                    month="long"
                                                                    day="numeric"
                                                                    year="numeric"
                                                                />
                                                            </span>
                                                        </v-col>
                                                    </v-row>
                                                </v-card-text>
                                            </v-card>
                                        </v-card-text>
                                    </v-card>
                                </template>
                            </v-dialog>
                        </v-card-actions>
                    </v-card>
                </v-list-item>
            </template>
            <template v-else>
                <v-list-item
                    class="px-0 text-center"
                >
                    No products found
                </v-list-item>
            </template>
        </v-list>
    </div>
</template>

<style scoped>
    .product-finder{
        min-width: 450px;
    }
    .date-select-content{
        max-height: 60vh;
        overflow-y: auto;
    }
</style>