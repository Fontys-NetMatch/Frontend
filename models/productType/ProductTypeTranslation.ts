
export default class ProductTypeTranslation {

    public id: number;
    public productTypeId: number;
    public langIsoCode: string;
    public name: string;
    public isActive: boolean;

    constructor(
        id: number,
        productTypeId: number,
        langIsoCode: string,
        name: string,
        isActive: boolean,
    ){
        this.id = id;
        this.productTypeId = productTypeId;
        this.langIsoCode = langIsoCode;
        this.name = name;
        this.isActive = isActive;
    }

}