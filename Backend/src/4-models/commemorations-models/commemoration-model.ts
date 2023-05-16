import { UploadedFile } from "express-fileupload";

export default class CommemorativeModel {
    public commemorativeID : number;
    public deceasedName : string;
    public biography : string;
    public about: string;
    public deceaseImage: UploadedFile;
    public deceaseImageName: string;
    public language: string;
    public birthDate: Date;
    public deathDay: Date;
    public state: string;
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

    public constructor(commemorative : CommemorativeModel){
        this.commemorativeID = commemorative.commemorativeID;
        this.deceasedName = commemorative.deceasedName;
        this.biography = commemorative.biography;
        this.about = commemorative.about;
        this.deceaseImage = commemorative.deceaseImage;
        this.deceaseImageName = commemorative.deceaseImageName;
        this.language = commemorative.language;
        this.birthDate = commemorative.birthDate;
        this.deathDay = commemorative.deathDay;
        this.state = commemorative.state;
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
    }



}