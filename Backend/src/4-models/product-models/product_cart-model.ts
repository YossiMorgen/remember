import Joi from "joi";

export default class ProductCartModel{

    public cartProductID: number;
    public productID: number;
    public amount: number;
    public cartID: number;

    public constructor(product: ProductCartModel){
        this.cartProductID = product.cartProductID;
        this.productID = product.productID;
        this.amount = product.amount;
        this.cartID = product.cartID;
    }

    public static validationSchema = Joi.object({
        cartProductID: Joi.number().optional().integer().positive(),
        productID: Joi.number().required().integer().positive(),
        amount: Joi.number().positive().required(),
        cartID: Joi.number().required().integer().positive()
    })

    public validation():string{
        const res = ProductCartModel.validationSchema.validate(this);
        return res.error?.message;
    }

}