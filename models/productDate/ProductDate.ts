
export default class ProductDate {

    public id: number;
    public price: number;
    public slots: number;
    public startDate: string;
    public endDate: string;
    public isActive: boolean;

    constructor(
        id: number,
        price: number,
        slots: number,
        startDate: string,
        endDate: string,
        isActive: boolean
    ){
        this.id = id;
        this.price = price;
        this.slots = slots;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = isActive;
    }

}