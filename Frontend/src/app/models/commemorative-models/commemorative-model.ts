import LanguageModel from "../languages-model";

export default class CommemorativeModel {
    public commemorativeID : number;
    public deceasedName : string;
    public biography : string;
    public about: string;
    public deceaseImage: File;
    public deceaseImageName: string;
    public language: LanguageModel;
    public birthDate: Date;
    public deathDate: Date;
    public state: string;
    public partnerType: string;
    public partnerName: string;
    public fatherName: string;
    public motherName: string;
    public childrenNames: string;
    public graveImage: File;
    public graveImageName: string;
    public graveYardName: string;
    public locationLink: string;
    public views: number;
    public lastWatched: Date;
    public flowersAmount: number;
    public candlesAmount: number;
}