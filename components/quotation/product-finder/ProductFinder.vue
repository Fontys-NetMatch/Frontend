<script setup lang="ts">
    defineProps({
        onProductAdd: {
            type: Function,
            required: true
        }
    });

    const toCurrency = (value: string) => {
        return value.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' });
    }

    import {fakeProductTypes} from './tempData/productTypes';
    const productTypes = fakeProductTypes;

    const selectedProductType = ref('All Product Types');
    const filterMenu = ref(false);
    const productTypeSearch = ref('');

    const startDateFilterTemp = ref('');
    const endDateFilterTemp = ref('');
    const priceRangeFilterTemp = ref([0, 1000]);
    const minPersonCountFilterTemp = ref(1);

    const startDateFilter = ref('');
    const endDateFilter = ref('');
    const priceRangeFilter = ref([0, 1000]);
    const minPersonCountFilter = ref(1);

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

    const items = fakeProducts;
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
        ></v-text-field>

        <v-divider></v-divider>

        <v-list
            style="height: calc(100vh - 450px); overflow-y: auto;"
        >
            <v-list-item
                v-for="(item, index) in filteredItems"
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
                                    {{ toCurrency(item.price) }}
                                </v-chip>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-subtitle>
                        {{ item.description }}
                    </v-card-subtitle>
                    <v-card-text>
                        <v-row>
                            <v-col v-if="item.departure != null">
                                <h5>Departure:</h5>
                                <strong>Datetime: </strong><span>{{ item.departure.date }} {{ item.departure.time }}</span><br>
                                <strong>Location: </strong><span>{{ item.departure.location }}</span>
                            </v-col>
                            <v-col v-if="item.arrival != null">
                                <h5>Arrival:</h5>
                                <strong>Datetime: </strong><span>{{ item.arrival.date }} {{ item.arrival.time }}</span><br>
                                <strong>Location: </strong><span>{{ item.arrival.location }}</span>
                            </v-col>
                        </v-row>
                        <div class="d-flex gap-1 mt-2">
                            <v-chip
                                color="primary"
                                text-color="white"
                                size="small"
                            >
                                {{ item.type }}
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
                        <v-btn
                            color="primary"
                            @click="onProductAdd(item)"
                        >
                            Add to Quotation
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-list-item>
        </v-list>
    </div>
</template>

<style scoped>
    .product-finder{
        min-width: 450px;
    }
</style>