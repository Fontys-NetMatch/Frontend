export default class QuotationProductType {

    public id: number;
    public langIsoCode: string;
    public name: string;
    public isActive: boolean;

    constructor(
        id: number,
        langIsoCode: string,
        name: string,
        isActive: boolean,
    ){
        this.id = id;
        this.langIsoCode = langIsoCode;
        this.name = name;
        this.isActive = isActive;

    }

}