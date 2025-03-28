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

    const productTypes = [
        'All Product Types',
        'Flight',
        'Hotel',
        'Hostel',
        'Car',
        'Exhibit',
        'Cruise',
        'Bus',
        'Train',
        'Restaurant Booking',
        'Event',
        'Insurance',
        'Guided Tour'
    ];

    const selectedProductType = ref('All Product Types');
    const filterMenu = ref(false);
    const productTypeSearch = ref('');

    const items = ref([
        {
            "name": "Flight to Paris",
            "departure": {
                "date": "2023-10-01",
                "time": "10:00",
                "location": "Amsterdam"
            },
            "arrival": {
                "date": "2023-10-01",
                "time": "12:00",
                "location": "Paris"
            },
            "price": 200,
            "type": "Flight",
            "description": "Direct flight from Amsterdam to Paris",
            "tags": [
                "Direct"
            ]
        },
        {
            "name": "Flight to Amsterdam",
            "departure": {
                "date": "2023-10-01",
                "time": "12:00",
                "location": "Paris"
            },
            "arrival": {
                "date": "2023-10-01",
                "time": "10:00",
                "location": "Amsterdam"
            },
            "price": 200,
            "type": "Flight",
            "description": "Direct flight from Paris to Amsterdam",
            "tags": [
                "Direct"
            ]
        }
    ]);
</script>

<template>
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

                <v-card min-width="300">
                    MENU CONTENT

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                            color="danger"
                            @click="filterMenu = false"
                        >
                            Clear
                        </v-btn>
                        <v-btn
                            color="primary"
                            @click="filterMenu = false"
                        >
                            Close
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
            v-for="(item, index) in items"
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
                        <v-col>
                            <h5>Departure:</h5>
                            <strong>Datetime: </strong><span>{{ item.departure.date }} {{ item.departure.time }}</span><br>
                            <strong>Location: </strong><span>{{ item.departure.location }}</span>
                        </v-col>
                        <v-col>
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
</template>

<style scoped>

</style>