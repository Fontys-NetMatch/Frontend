import type QuotationItem from "~/models/quotation/QuotationItem";
import type Customer from "~/models/customer";

export default class Quotation {

    public id: number|null;
    public customer: Customer;
    public items: QuotationItem[];
    public totalPrice: number;

    constructor(
        id: number|null,
        customer: Customer,
        items: QuotationItem[],
        totalPrice: number
    ){
        this.id = id;
        this.customer = customer;
        this.items = items;
        this.totalPrice = totalPrice;
    }

}