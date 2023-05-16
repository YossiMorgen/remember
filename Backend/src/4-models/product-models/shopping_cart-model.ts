import Joi from "joi";
class Cart{
    public cartID: number;
    public userID: number;
    public productionDate: Date;

    constructor(cart: Cart) {
        this.cartID = cart.cartID;
        this.userID = cart.userID;
        this.productionDate = new Date(cart.productionDate);
    }

    public static validationSchema = Joi.object({
        cartID: Joi.number().integer().positive().required(),
        userID: Joi.number().integer().positive().required(),
        productionDate: Joi.date().required()
    })

    public validation():string{
        const res = Cart.validationSchema.validate(this);
        return res.error?.message;
    }
}
export default Cart