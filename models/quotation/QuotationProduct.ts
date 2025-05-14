import type ProductDate from "~/models/productDate/ProductDate";
import QuotationProductType from "~/models/quotation/QuotationProductType";

export default class QuotationProduct {

    public id: number;
    public name: string;
    public description: string|null;
    public type: QuotationProductType;
    public tags: string[];
    public startLocation: string;
    public endLocation: string;
    public minPrice: number;
    public maxPrice: number;
    public dates: ProductDate[];

    constructor(
        id: number,
        name: string,
        description: string|null,
        type: QuotationProductType,
        tags: string[],
        startLocation: string,
        endLocation: string,
        minPrice: number,
        maxPrice: number,
        dates: ProductDate[]
    ){
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.tags = tags;
        this.startLocation = startLocation;
        this.endLocation = endLocation;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.dates = dates;
    }

}