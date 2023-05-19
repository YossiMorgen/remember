import { UploadedFile } from "express-fileupload";
import Joi from "joi";

export default class CommemorationSitesModel {
    public commemorationSiteID: number;
    public userID : number;
    public commemorationName: string;
    public commemorationAddress: string;
    public image: UploadedFile;
    public imageName: string;
    public description: string;

    public constructor(commemorationSites: CommemorationSitesModel){
        this.commemorationSiteID = commemorationSites.commemorationSiteID;
        this.userID = commemorationSites.userID;
        this.commemorationName = commemorationSites.commemorationName;
        this.commemorationAddress = commemorationSites.commemorationAddress;
        this.image = commemorationSites.image;
        this.imageName = commemorationSites.imageName;
        this.description = commemorationSites.description;
    }

    public static validationSchema = Joi.object({
        commemorationSiteID: Joi.number().optional().integer().positive(),
        userID: Joi.number().required().integer().positive(),
        commemorationName: Joi.string().max(25).required(),
        commemorationAddress: Joi.string().max(30).required(),
        image: Joi.object().optional(),
        imageName: Joi.string().max(150).optional(),
        description: Joi.string().max(100).required(),
    })

    public validation():string{
        const res = CommemorationSitesModel.validationSchema.validate(this);
        return res.error?.message;
    }
}