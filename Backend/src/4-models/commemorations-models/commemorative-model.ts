import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import LanguageModel from "../languages-model";

export default class CommemorativeModel {
    public commemorativeID : number;
    public userID : number;
    public deceasedName : string;
    public biography : string;
    public about: string;
    public deceaseImage: UploadedFile;
    public deceaseImageName: string;
    public language: LanguageModel;
    public birthDate: Date;
    public deathDate: Date;
    public state: string;
    public city: string;
    public partnerType: string;
    public partnerName: string;
    public fatherName: string;
    public motherName: string;
    public childrenNames: string;
    public graveImage: UploadedFile;
    public graveImageName: string;
    public graveYardName: string;
    public locationLink: string;
    public views: number;
    public lastWatched: Date;

    public constructor(commemorative : CommemorativeModel){
        this.commemorativeID = commemorative.commemorativeID;
        this.userID = commemorative.userID;
        this.deceasedName = commemorative.deceasedName;
        this.biography = commemorative.biography;
        this.about = commemorative.about;
        this.deceaseImage = commemorative.deceaseImage;
        this.deceaseImageName = commemorative.deceaseImageName;
        this.language = commemorative.language;
        this.birthDate = commemorative.birthDate;
        this.deathDate = commemorative.deathDate;
        this.state = commemorative.state;
        this.city = commemorative.city;
        this.partnerType = commemorative.partnerType;
        this.partnerName = commemorative.partnerName;
        this.fatherName = commemorative.fatherName;
        this.motherName = commemorative.motherName;
        this.childrenNames = commemorative.childrenNames;
        this.graveImage = commemorative.graveImage;
        this.graveImageName = commemorative.graveImageName;
        this.graveYardName = commemorative.graveYardName;
        this.locationLink = commemorative.locationLink;
        this.views = commemorative.views;
        this.lastWatched = commemorative.lastWatched;
    }


    public static validationSchema = Joi.object({
        commemorativeID: Joi.number().optional().integer().positive(),
        userID: Joi.number().required().integer().positive(),
        deceasedName: Joi.string().min(2).max(30).required(),
        biography: Joi.string().min(2).max(200).required(),
        about: Joi.string().min(2).max(200).required(),
        deceaseImage: Joi.object().optional(),
        deceaseImageName: Joi.string().optional(),
        language: Joi.string().valid(...Object.values(LanguageModel)).required(),
        birthDate: Joi.date().required(),
        deathDate: Joi.date().required(),
        state: Joi.string().min(2).max(15).required(),
        city: Joi.string().min(2).max(15).required(),
        partnerType: Joi.string().valid('Wife', 'Husband').required(),
        partnerName: Joi.string().min(2).max(20).required(),
        fatherName: Joi.string().min(2).max(20),
        motherName: Joi.string().min(2).max(20),
        childrenNames: Joi.string().max(400).optional(),
        graveImage: Joi.object().optional(),
        graveImageName: Joi.string().max(150).optional(),
        graveYardName: Joi.string().min(2).max(20).required(),
        locationLink: Joi.string().min(2).max(100).optional(),
        views: Joi.number().optional(),
        lastWatched: Joi.date().optional(),
    })

    public validation():string{
        const res = CommemorativeModel.validationSchema.validate(this);
        return res.error?.message;
    }
}