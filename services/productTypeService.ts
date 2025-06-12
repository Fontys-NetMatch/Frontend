import {useToastStore} from "~/store/toast";
import {useAuthStore} from "~/store/auth";
import ProductType from "~/models/productType/ProductType";
import ProductTypeTranslation from "~/models/productType/ProductTypeTranslation";

export default class ProductService {
    public static async getProductTypes(): Promise<ProductType[] | null> {
        const { toast } = useToastStore();
        const authStore = useAuthStore();
        const config = useRuntimeConfig();
        const backendBaseUrl = config.public.backendBaseUrl;

        try {
            const response = await $fetch(backendBaseUrl + '/product-type', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authStore.jwtToken}`
                }
            }) as { success: boolean; message?: string; statusCode: number; productTypes: any[] };

            if (!response.success || response.statusCode !== 200) {
                toast(response.message || 'Failed to fetch product types', 'error');
                return null;
            }

            return response.productTypes
                .map((pt: any) => {
                    return new ProductType(
                        pt.id,
                        pt.isActive,
                        pt.translations.map((translation: any) => {
                            return new ProductTypeTranslation(
                                translation.id,
                                translation.productTypeId,
                                translation.langIsoCode,
                                translation.name,
                                translation.isActive
                            );
                        })
                    );
                })
                .filter((qp: ProductType | null): qp is ProductType => qp !== null);
        } catch (err) {
            toast('Error getting product types', 'error');
            console.error(err);
            return null;
        }
    }
}