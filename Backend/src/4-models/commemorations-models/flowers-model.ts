import Joi from "joi";

export default class FlowersModel {
    public commemorativeID: number;
    public userID : number;
    public amount: number;
    public lastUpdate: Date;

    public constructor(flower: FlowersModel){
        this.commemorativeID = flower.commemorativeID;
        this.userID = flower.userID;
        this.amount = flower.amount;
        this.lastUpdate = flower.lastUpdate;
    }

    public static validationSchema = Joi.object({
        commemorativeID: Joi.number().optional().integer().positive(),
        userID: Joi.number().optional().integer().positive(),
        amount: Joi.number().required().integer().positive(),
        lastUpdate: Joi.date().optional()
    })

    public validation():string{
        const res = FlowersModel.validationSchema.validate(this);
        return res.error?.message;
    }
}