import type ProductDate from "~/models/productDate/ProductDate";
import type QuotationProduct from "~/models/quotation/QuotationProduct";
import type QuotationItem from "~/models/quotation/QuotationItem";
import type Customer from "~/models/Customer";

export default class Quotation {

    public id: number;
    public customerId: number;
    public customer: Customer;
    public items: QuotationItem[];
    public totalPrice: number;

    constructor(
        id: number,
        customerId: number,
        customer: Customer,
        items: QuotationItem[],
        totalPrice: number
    ){
        this.id = id;
        this.customerId = customerId;
        this.customer = customer;
        this.items = items;
        this.totalPrice = totalPrice;
    }

}