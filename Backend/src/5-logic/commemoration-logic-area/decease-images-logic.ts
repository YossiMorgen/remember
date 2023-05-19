import appConfig from "../../2-utils/AppConfig";
import dal from "../../2-utils/dal";
import fileHandler from "../../2-utils/file-handler";
import DeceaseImagesModel from "../../4-models/commemorations-models/decease-images-model";

async function getAllDeceaseImages(commemorativeID: number, offset: number) {
    const sql = `
    SELECT 
        deceaseImageID, 
        commemorativeID, 
        userID, 
        CONCAT(?, imageName) AS imageName
    FROM deceaseImages 
    WHERE commemorativeID = ?
    ORDER BY deceaseImageID DESC
    LIMIT 10 OFFSET ?;`;
    const deceaseImages = await dal.execute(sql, [appConfig.nodeUrl, commemorativeID, offset]);

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

async function deleteDeceaseImage(deceaseImageID: number, userID: number, isAdmin: boolean) {
    let sql = `DELETE FROM deceaseImages WHERE deceaseImageID = ?`;
    const arr = [deceaseImageID];
    if (!isAdmin) {
        sql += ` AND userID = ?`;
        arr.push(userID);
    }

    await dal.execute(sql, arr);
}

export default { getAllDeceaseImages, addDeceaseImage, deleteDeceaseImage };