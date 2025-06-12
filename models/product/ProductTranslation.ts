
export default class ProductTranslation {

    public id: number;
    public productId: number;
    public langIsoCode: string;
    public name: string;
    public description: string;
    public tags: string[];
    public isActive: boolean;

    constructor(
        id: number,
        productId: number,
        langIsoCode: string,
        name: string,
        description: string,
        tags: string[],
        isActive: boolean,
    ){
        this.id = id;
        this.productId = productId;
        this.langIsoCode = langIsoCode;
        this.name = name;
        this.description = description;
        this.tags = tags;
        this.isActive = isActive;
    }

}