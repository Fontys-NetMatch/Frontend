import type ProductType from "~/models/productType/ProductType";
import type ProductDate from "~/models/productDate/ProductDate";
import type ProductTranslation from "~/models/product/ProductTranslation";

export default class Product {

    public id: number;
    public productTypeId: number;
    public productType: ProductType;
    public startLocation: string;
    public endLocation: string;
    public dates: ProductDate[];
    public translations: ProductTranslation[];
    public deletedAt: string;

    constructor(
        id: number,
        productTypeId: number,
        productType: ProductType,
        startLocation: string,
        endLocation: string,
        dates: ProductDate[],
        translations: ProductTranslation[],
        deletedAt: string
    ){
        this.id = id;
        this.productTypeId = productTypeId;
        this.productType = productType;
        this.startLocation = startLocation;
        this.endLocation = endLocation;
        this.dates = dates;
        this.translations = translations;
        this.deletedAt = deletedAt;
    }

}