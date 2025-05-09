import type ProductDate from "~/models/productDate/ProductDate";
import type QuotationProduct from "~/models/quotation/QuotationProduct";

export default class QuotationItem {

    public product: QuotationProduct;
    public productDate: ProductDate;

    constructor(
        product: QuotationProduct,
        productDate: ProductDate
    ){
        this.product = product;
        this.productDate = productDate;
    }

}