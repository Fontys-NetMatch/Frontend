import type ProductTypeTranslation from "~/models/productType/ProductTypeTranslation";

export default class ProductType {

    public id: number;
    public isActive: boolean;
    public translations: ProductTypeTranslation[];

    constructor(
        id: number,
        isActive: boolean,
        translations: ProductTypeTranslation[]
    ){
        this.id = id;
        this.isActive = isActive;
        this.translations = translations;
    }

}