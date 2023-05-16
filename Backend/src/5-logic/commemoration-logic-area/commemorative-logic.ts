import { OkPacket } from "mysql";
import dal from "../../2-utils/dal";
import fileHandler from "../../2-utils/file-handler";
import CommemorativeModel from "../../4-models/commemorations-models/commemorative-model";
import { ValidationErrorModel } from "../../4-models/error-models";
import appConfig from "../../2-utils/AppConfig";

async function getRandomCommemorative(offset: number){
    const limit = 10;

    const sql = `
        SELECT commemorativeID, deceasedName, deceaseImageName, deathDate 
        FROM commemorative
        LIMIT ?
        OFFSET ?
    `

    const commemorative = await dal.execute(sql, [limit, offset])

    return commemorative;

}

async function getCommemorativeByID(commemorativeID: number){
    const sql = ` SELECT * FROM commemorative WHERE commemorativeID = ?`
    const [commemorative] = await dal.execute(sql, [commemorativeID])
    commemorative.graveImageName = appConfig.nodeUrl + commemorative.graveImageName;
    commemorative.deceaseImageName = appConfig.nodeUrl + commemorative.deceaseImageName;
    
    return commemorative;
}

async function addCommemorative (commemorative: CommemorativeModel){

    const err = commemorative.validation();
    if(err) throw new ValidationErrorModel(err);
    
    commemorative.deceaseImageName = await fileHandler.saveFile(commemorative.deceaseImage);
    commemorative.graveImageName = await fileHandler.saveFile(commemorative.graveImage);

    delete commemorative.deceaseImage;
    delete commemorative.graveImage;

    let sql = `INSERT INTO users VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const info: OkPacket = await dal.execute(sql, [
        commemorative.deceasedName, 
        commemorative.biography, 
        commemorative.about, 
        commemorative.deceaseImageName,
        commemorative.language,
        commemorative.birthDate,
        commemorative.deathDate,
        commemorative.state,
        commemorative.partnerType,
        commemorative.partnerName,
        commemorative.fatherName,
        commemorative.motherName,
        commemorative.childrenNames,
        commemorative.graveImageName,
        commemorative.graveYardName,
        commemorative.locationLink,
        commemorative.views
    ])

    commemorative.commemorativeID = info.insertId;
    commemorative.graveImageName = appConfig.nodeUrl + commemorative.graveImageName;
    commemorative.deceaseImageName = appConfig.nodeUrl + commemorative.deceaseImageName;
    
    return commemorative;
}

