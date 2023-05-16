import Joi from "joi";

export default class OrdersModel{

    public orderID: number;
    public cartID: number;
    public userID: number;
    public price: number;
    public city: string;
    public address: string;
    public deliveryDate: Date;
    public orderDate: Date;
    public creditCard: number;

    public constructor(product: OrdersModel){
        this.orderID = product.orderID;
        this.cartID = product.cartID;
        this.userID = product.userID;
        this.price = product.price;
        this.city = product.city;
        this.address = product.address;
        this.deliveryDate = product.deliveryDate;
        this.orderDate = product.orderDate;
        this.creditCard = product.creditCard;
    }

    public static validationSchema = Joi.object({
        orderID: Joi.number().optional().integer().positive(),
        cartID: Joi.number().optional().integer().positive(),
        userID: Joi.number().optional().integer().positive(),
        price: Joi.number().positive().required(),
        city: Joi.string().min(2).max(30).required(),
        address: Joi.string().min(2).max(200).required(),
        deliveryDate: Joi.date().required(),
        orderDate: Joi.date().optional(),
        creditCard: Joi.string().min(4).max(4).required()
    })

    public validation():string{
        const res = OrdersModel.validationSchema.validate(this);
        return res.error?.message;
    }

}