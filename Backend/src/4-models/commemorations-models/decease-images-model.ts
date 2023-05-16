import { UploadedFile } from "express-fileupload";
import Joi from "joi";

export default class DeceaseImagesModel{
    public commemorativeID: number;
    public userID: number;
    public image: UploadedFile;
    public imageName: string;

    public constructor(deceaseImages: DeceaseImagesModel){
        this.commemorativeID = deceaseImages.commemorativeID;
        this.userID = deceaseImages.userID;
        this.image = deceaseImages.image;
        this.imageName = deceaseImages.imageName;
    }

    public static validationSchema = Joi.object({
        commemorativeID: Joi.number().optional().integer().positive(),
        userID: Joi.number().optional().integer().positive(),
        image: Joi.object().optional(),
        imageName: Joi.string().optional()
    })
}