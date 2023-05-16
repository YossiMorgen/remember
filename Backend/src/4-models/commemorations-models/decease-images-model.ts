import { UploadedFile } from "express-fileupload";
import Joi from "joi";

export default class DeceaseImagesModel{
    public deceaseImageID: number;
    public commemorativeID: number;
    public userID: number;
    public image: UploadedFile;
    public imageName: string;

    public constructor(deceaseImages: DeceaseImagesModel){
        this.deceaseImageID = deceaseImages.deceaseImageID;
        this.commemorativeID = deceaseImages.commemorativeID;
        this.userID = deceaseImages.userID;
        this.image = deceaseImages.image;
        this.imageName = deceaseImages.imageName;
    }

    public static validationSchema = Joi.object({
        deceaseImageID: Joi.number().optional().integer().positive(),
        commemorativeID: Joi.number().optional().integer().positive(),
        userID: Joi.number().optional().integer().positive(),
        image: Joi.object().optional(),
        imageName: Joi.string().optional()
    })
}