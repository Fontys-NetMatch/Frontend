import {useToastStore} from "~/store/toast";
import {useAuthStore} from "~/store/auth";
import ProductDate from "~/models/productDate/ProductDate";
import Product from "~/models/product/Product";
import ProductType from "~/models/productType/ProductType";
import ProductTypeTranslation from "~/models/productType/ProductTypeTranslation";
import ProductTranslation from "~/models/product/ProductTranslation";

export default class ProductService {
    public static async getProducts(params: {
        typeId?: number;
        startDateTime?: string;
        endDateTime?: string;
        minPrice?: number;
        maxPrice?: number;
        minPeople?: number;
        searchQuery?: string;
    }): Promise<Product[] | null> {
        const { toast } = useToastStore();
        const authStore = useAuthStore();
        const config = useRuntimeConfig();
        const backendBaseUrl = config.public.backendBaseUrl;

        try {
            const queryParams = {} as Record<string, string>;
            if (params.typeId) {
                queryParams['typeId'] = params.typeId.toString();
            }
            if (params.startDateTime) {
                queryParams['startDateTime'] = params.startDateTime;
            }
            if (params.endDateTime) {
                queryParams['endDateTime'] = params.endDateTime;
            }
            if (params.minPrice) {
                queryParams['minPrice'] = params.minPrice.toString();
            }
            if (params.maxPrice) {
                queryParams['maxPrice'] = params.maxPrice.toString();
            }
            if (params.minPeople) {
                queryParams['minPeople'] = params.minPeople.toString();
            }
            if(params.searchQuery) {
                queryParams['searchQuery'] = params.searchQuery;
            }

            const response = await $fetch(backendBaseUrl + '/product?' + new URLSearchParams(queryParams), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authStore.jwtToken}`
                }
            }) as { success: boolean; message?: string; statusCode: number; products: any[] };

            if (!response.success || response.statusCode !== 200) {
                toast(response.message || 'Failed to fetch products', 'error');
                return null;
            }

            return response.products
                .map((p: any) => {
                    return new Product(
                        p.id,
                        p.productTypeId,
                        new ProductType(
                            p.productType.id,
                            p.productType.isActive,
                            p.productType.translations.map((translation: any) =>
                                new ProductTypeTranslation(
                                    translation.id,
                                    translation.productTypeId,
                                    translation.langIsoCode,
                                    translation.name,
                                    translation.isActive
                                )
                            )
                        ),
                        p.startLocation,
                        p.endLocation,
                        p.dates.map((d: any) =>
                            new ProductDate(
                                d.id,
                                d.price,
                                d.slots,
                                d.startDate,
                                d.endDate,
                                d.isActive
                            )
                        ),
                        p.translations.map((t: any) =>
                            new ProductTranslation(
                                t.id,
                                t.productId,
                                t.langIsoCode,
                                t.name,
                                t.description,
                                t.tags,
                                t.isActive
                            )
                        ),
                        p.deletedAt
                    );
                })
                .filter((qp: Product | null): qp is Product => qp !== null);
        } catch (err) {
            toast('Error getting products', 'error');
            console.error(err);
            return null;
        }
    }
}