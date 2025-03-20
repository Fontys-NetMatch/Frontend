export default class User{

    public id: number;
    public firstname: string;
    public surname: string;
    public email: string;
    public phone: string|null;

    constructor(
        id: number,
        firstname: string,
        surname: string,
        email: string,
        phone: string|null
    ){
        this.id = id;
        this.firstname = firstname;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
    }

}