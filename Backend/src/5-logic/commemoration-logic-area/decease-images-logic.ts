import dal from "../../2-utils/dal";
import DeceaseImagesModel from "../../4-models/commemorations-models/decease-images-model";

async function getAllDeceaseImages(params:DeceaseImagesModel) {
    const sql = `SELECT * FROM deceaseImages WHERE commemorativeID = ?`;
    const deceaseImages = await dal.execute(sql, [params.commemorativeID]);
    return deceaseImages;
}

async function addDeceaseImage(deceaseImage: DeceaseImagesModel) {
    const sql = `INSERT INTO deceaseImages VALUES (DEFAULT, ?, ?)`;
    const info = await dal.execute(sql, [
        deceaseImage.commemorativeID,
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