import { UploadedFile } from 'express-fileupload';
import Joi from "joi";
import WeightModel from './weight-model';

export default class ProductModel{

    public productID: number;
    public productName: string; 
    public categoryID : number;
    public price: number;
    public image: UploadedFile;
    public imageName: string;
    public description: string;
    public weight: number;
    public weightType: WeightModel;
    public unitsInStock: number;

    public constructor(product: ProductModel){
        this.productID = product.productID;
        this.productName = product.productName;
        this.categoryID  = product.categoryID;
        this.price = product.price;
        this.image = product.image;
        this.imageName = product.imageName;
        this.description = product.description;
        this.weight = product.weight;
        this.weightType = product.weightType;
        this.unitsInStock = product.unitsInStock;
    }

    public static validationSchema = Joi.object({
        productID: Joi.number().optional().integer().positive(),
        productName: Joi.string().required(),
        categoryID : Joi.number().required().positive(),
        price: Joi.number().positive().required(),
        image: Joi.object().optional(),
        imageName: Joi.string().optional(),
        description: Joi.string().min(2).max(100).required(),
        weight: Joi.number().min(0).required(),
        weightType: Joi.string().valid(...Object.values(WeightModel)),
        unitsInStock: Joi.number().min(0).required(),
    })

    public validation():string{
        const res = ProductModel.validationSchema.validate(this);
        return res.error?.message;
    }

}