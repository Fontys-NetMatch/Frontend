export default class Customer{

    public id: number|null;
    public firstname: string;
    public surname: string;
    public email: string;
    public phone: string;
    public address: string;
    public city: string;
    public state: string;
    public zip: string;

    constructor(
        id: number|null,
        firstname: string,
        surname: string,
        email: string,
        phone: string,
        address: string,
        city: string,
        state: string,
        zip: string
    ){
        this.id = id;
        this.firstname = firstname;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

}