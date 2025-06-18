<script setup lang="ts">
    import type QuotationItem from "~/models/quotation/QuotationItem";

    const props = defineProps({
        quotationItems: {
            type: Object as PropType<Record<string, QuotationItem[]>>,
            required: true
        },
    });

    const emit = defineEmits<{
        (e: 'productRemoved', productId: number): void;
    }>();

    const onProductRemoved = (productId: number) => {
        emit('productRemoved', productId);
    };

    const toCurrency = (value: number) =>
        Number(value).toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' });
    const toDateTime = (value: string) => {
        const date = new Date(value);
        return date.toLocaleDateString('nl-NL', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

</script>

<template>
    <h4>Offerte Opstellen</h4>
    <template v-if="Object.keys(props.quotationItems).length === 0">
        <div>
            Geen producten toegevoegd
        </div>
    </template>
    <div class="quotation-item-container" >
        <div v-for="(items, date) in props.quotationItems" :key="date">
            <div class="quotation-item-group">
                <h3>{{ date }}</h3>
                <div class="quotation-items">
                    <div class="quotation-item" v-for="(item, index) in items" :key="index">
                        <v-card
                            variant="tonal"
                            class="w-100"
                            image="https://picsum.photos/200/300"
                        >
                            <v-card-title>
                                <v-row>
                                    <v-col>
                                        {{ item.product.name }}
                                    </v-col>
                                    <v-col cols="auto">
                                        <v-chip
                                            color="primary"
                                            text-color="white"
                                        >
                                            {{ toCurrency(item.productDate.price) }}
                                        </v-chip>
                                    </v-col>
                                </v-row>
                            </v-card-title>
                            <v-card-subtitle>
                                {{ item.product.description }}
                            </v-card-subtitle>
                            <v-card-text>
                                <v-row>
                                    <v-col v-if="item.product.startLocation != null">
                                        <h6>Departure:</h6>
                                        <span>{{ item.product.startLocation }}</span><br>
                                        <span>{{ toDateTime(item.productDate.startDate) }}</span>
                                    </v-col>
                                    <v-col v-if="item.product.endLocation != null">
                                        <h6>Arrival:</h6>
                                        <span>{{ item.product.endLocation }}</span><br>
                                        <span>{{ toDateTime(item.productDate.endDate) }}</span>
                                    </v-col>
                                </v-row>
                                <div class="d-flex gap-1 mt-3">
                                    <v-chip
                                        color="primary"
                                        text-color="white"
                                        size="small"
                                    >
                                        {{ item.product.type.name }}
                                    </v-chip>
                                    <v-chip
                                        text-color="white"
                                        size="small"
                                        v-for="tag in item.product.tags"
                                    >
                                        {{ tag }}
                                    </v-chip>
                                </div>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn
                                    icon
                                    @click="onProductRemoved(item.product.id)"
                                    class="ml-auto text-danger"
                                >
                                    <v-icon>
                                        mdi-delete
                                    </v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .quotation-item-container{
        max-height: calc(100vh - 335px);
        overflow: auto;
    }
    .quotation-item-group{
        margin-bottom: 30px;
    }
    .quotation-items{
        .quotation-item{
            margin-bottom: 10px;
            max-width: 600px;
        }
    }
</style>