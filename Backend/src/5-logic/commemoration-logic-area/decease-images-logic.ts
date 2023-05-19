import appConfig from "../../2-utils/AppConfig";
import dal from "../../2-utils/dal";
import fileHandler from "../../2-utils/file-handler";
import DeceaseImagesModel from "../../4-models/commemorations-models/decease-images-model";

async function getAllDeceaseImages(commemorativeID: number) {
    const sql = `
    SELECT 
        deceaseImageID, 
        commemorativeID, 
        userID, 
        CONCAT(?, imageName) AS imageName
    FROM deceaseImages 
    WHERE commemorativeID = ?`;
    const deceaseImages = await dal.execute(sql, [appConfig.nodeUrl, commemorativeID]);

    return deceaseImages;
}

async function addDeceaseImage(deceaseImage: DeceaseImagesModel) {

    deceaseImage.imageName = await fileHandler.saveFile(deceaseImage.image);
    const sql = `INSERT INTO deceaseImages VALUES (DEFAULT, ?, ?, ?)`;
    const info = await dal.execute(sql, [
        deceaseImage.commemorativeID,
        deceaseImage.userID,
        deceaseImage.imageName,
    ]);

    deceaseImage.deceaseImageID = info.insertId;
    return deceaseImage;
}

async function deleteDeceaseImage(deceaseImageID: number) {
    const sql = `DELETE FROM deceaseImages WHERE deceaseImageID = ?`;
    await dal.execute(sql, [deceaseImageID]);
}

export default { getAllDeceaseImages, addDeceaseImage, deleteDeceaseImage };