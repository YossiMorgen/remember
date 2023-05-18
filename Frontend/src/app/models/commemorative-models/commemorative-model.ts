import LanguageModel from "../languages-model";

export default class CommemorativeModel {
    // basic data
    public commemorativeID : number;
    public userID : number;
    public deceasedName : string;
    public biography : string;
    public about: string;
    public deceaseImage: File;
    public deceaseImageName: string;
    public language: LanguageModel;

    // technical data
    public birthDate: string;
    public deathDate: string;
    public state: string;
    public city: string;
    public partnerType: string;
    public partnerName: string;
    public fatherName: string;
    public motherName: string;
    public childrenNames: string;

    // grave data
    public graveImage: File;
    public graveImageName: string;
    public graveYardName: string;
    public locationLink: string;
    public views: number;
    public lastWatched: Date;
    public flowersAmount: number;
    public candlesAmount: number;
}