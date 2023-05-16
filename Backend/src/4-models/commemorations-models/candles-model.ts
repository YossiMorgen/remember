import Joi from "joi";

export default class CandlesModel {
    public commemorativeID: number;
    public userID: number;
    public amount: number;

    public constructor(candle: CandlesModel){
        this.commemorativeID = candle.commemorativeID;
        this.userID = candle.userID;
        this.amount = candle.amount;
    }

    public static validationSchema = Joi.object({
        commemorativeID: Joi.number().optional().integer().positive(),
        userID : Joi.number().optional().integer().positive(),
        amount: Joi.number().optional().integer().positive(),
    })

    public validation():string{
        const res = CandlesModel.validationSchema.validate(this);
        return res.error?.message;
    }
}