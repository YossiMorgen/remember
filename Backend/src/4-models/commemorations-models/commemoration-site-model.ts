import { UploadedFile } from "express-fileupload";

export default class CommemorationSitesModel {
    public commemorationSiteID: number;
    public commemorativeID: number;
    public commemorationName: string;
    public commemorationAddress: string;
    public image: UploadedFile;
    public imageName: string;
    public description: string;
    public connection: string;

    public constructor(commemorationSites: CommemorationSitesModel){
        this.commemorationSiteID = commemorationSites.commemorationSiteID
        this.commemorativeID = commemorationSites.commemorativeID
        this.commemorationName = commemorationSites.commemorationName
        this.commemorationAddress = commemorationSites.commemorationAddress
        this.image = commemorationSites.image
        this.imageName = commemorationSites.imageName
        this.description = commemorationSites.description
        this.connection = commemorationSites.connection
    }
}