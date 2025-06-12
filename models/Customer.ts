export default class Customer{

    public id: number;
    public name: string;
    public address: string;
    public city: string;
    public state: string;
    public zip: string;

    constructor(
        id: number,
        name: string,
        address: string,
        city: string,
        state: string,
        zip: string
    ){
        this.id = id;
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

}