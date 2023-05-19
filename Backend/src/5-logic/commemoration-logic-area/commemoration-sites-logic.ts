import { OkPacket } from "mysql";
import dal from "../../2-utils/dal";
import fileHandler from "../../2-utils/file-handler";
import CommemorationSitesModel from "../../4-models/commemorations-models/commemoration-site-model";
import { ValidationErrorModel } from "../../4-models/error-models";
import e from "express";

async function getAllCommemorationSitesByCommemorativeID(commemorativeID : number) {
    const sql = `SELECT * FROM commemoration_sites WHERE commemorativeID = ?`;
    const commemorationSites = await dal.execute(sql, [commemorativeID]);
    return commemorationSites;
}

async function addCommemorationSite(commemorationSite: CommemorationSitesModel) {
    const err = commemorationSite.validation();
    if (err) throw new ValidationErrorModel(err);

    commemorationSite.imageName = await fileHandler.saveFile(commemorationSite.image);
    delete commemorationSite.image;

    const sql = `INSERT INTO commemoration_sites VALUES (DEFAULT, ?, ?, ?, ?, ?)`;
    const info:OkPacket = await dal.execute(sql, [
        commemorationSite.userID,
        commemorationSite.commemorationName,
        commemorationSite.commemorationAddress,
        commemorationSite.imageName,
        commemorationSite.description,
    ]);

    commemorationSite.commemorationSiteID = info.insertId;
    return commemorationSite;
}

async function updateCommemorationSite(commemorationSite: CommemorationSitesModel) {
    const err = commemorationSite.validation();
    if (err) throw new ValidationErrorModel(err);

    if (commemorationSite.image){
        const oldCommemorationSite = await getCommemorationSiteByID(commemorationSite.commemorationSiteID);
        fileHandler.deleteFile(oldCommemorationSite.imageName);

        commemorationSite.imageName = await fileHandler.saveFile(commemorationSite.image);
        delete commemorationSite.image;
    }


    const sql = `UPDATE commemoration_sites SET userID =?, commemorationName = ?, commemorationAddress = ?, imageName = ?, description = ? WHERE commemorationSiteID = ?`;
    await dal.execute(sql, [
        commemorationSite.userID,
        commemorationSite.commemorationName,
        commemorationSite.commemorationAddress,
        commemorationSite.imageName,
        commemorationSite.description,
        commemorationSite.commemorationSiteID,
    ]);

    return commemorationSite;
}

async function deleteCommemorationSite(commemorationSiteID: number) {
    const commemorationSite = await getCommemorationSiteByID(commemorationSiteID);
    fileHandler.deleteFile(commemorationSite.imageName);

    const sql = `DELETE FROM commemoration_sites WHERE commemorationSiteID = ?`;
    await dal.execute(sql, [commemorationSiteID]);
}

async function getCommemorationSiteByID(commemorationSiteID: number) {
    const sql = `SELECT * FROM commemoration_sites WHERE commemorationSiteID = ?`;
    const [commemorationSite] = await dal.execute(sql, [commemorationSiteID]);
    return commemorationSite;
}

export default {
    getAllCommemorationSitesByCommemorativeID,
    addCommemorationSite,
    updateCommemorationSite,
    deleteCommemorationSite,
    getCommemorationSiteByID,
}