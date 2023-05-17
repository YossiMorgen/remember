import { OkPacket } from "mysql";
import dal from "../../2-utils/dal";
import fileHandler from "../../2-utils/file-handler";
import CommemorativeModel from "../../4-models/commemorations-models/commemorative-model";
import { ValidationErrorModel } from "../../4-models/error-models";
import appConfig from "../../2-utils/AppConfig";
import LanguageModel from "../../4-models/languages-model";

async function getRandomCommemorative(offset: number, language: string){
    const limit = 10;

    const sql = `
        SELECT 
            commemorativeID, 
            userID, 
            deceasedName, 
            deceaseImageName, 
            deathDate
            SUM(flowers.amount) AS flowersAmount,
            SUM(candles.amount) AS candlesAmount
        FROM commemorative
        LEFT JOIN candles ON commemorative.commemorativeID = candles.commemorativeID
        LEFT JOIN flowers ON commemorative.commemorativeID = flowers.commemorativeID
        WHERE language = ?
        LIMIT ?
        OFFSET ?
    `

    const commemorative = await dal.execute(sql, [language, limit, offset])

    return commemorative;

}

async function getCommemorativeByID(commemorativeID: number){
    const sql = ` 
        SELECT 
            commemorativeID, 
            userID,
            deceasedName, 
            biography, 
            about, 
            deceaseImageName, 
            language, 
            birthDate, 
            deathDate, 
            state, 
            partnerType, 
            partnerName, 
            fatherName, 
            motherName, 
            childrenNames, 
            graveImageName, 
            graveYardName, 
            locationLink, 
            views, 
            lastWatched,
            SUM(flowers.amount) AS flowersAmount,
            SUM(candles.amount) AS candlesAmount
        FROM commemorative 
        LEFT JOIN candles ON commemorative.commemorativeID = candles.commemorativeID
        LEFT JOIN flowers ON commemorative.commemorativeID = flowers.commemorativeID
        WHERE commemorativeID = ?`
    const [commemorative] = await dal.execute(sql, [commemorativeID])
    commemorative.graveImageName = appConfig.nodeUrl + commemorative.graveImageName;
    commemorative.deceaseImageName = appConfig.nodeUrl + commemorative.deceaseImageName;
    
    return commemorative;
}

async function getCommemorativeByUser(userID: number){
    const sql = `  
    SELECT 
        commemorativeID, 
        userID,
        deceasedName, 
        biography, 
        about, 
        deceaseImageName, 
        language, 
        birthDate, 
        deathDate, 
        state, 
        partnerType, 
        partnerName, 
        fatherName, 
        motherName, 
        childrenNames, 
        graveImageName, 
        graveYardName, 
        locationLink, 
        views, 
        lastWatched,
        SUM(flowers.amount) AS flowersAmount,
        SUM(candles.amount) AS candlesAmount
    FROM commemorative 
    LEFT JOIN candles ON commemorative.commemorativeID = candles.commemorativeID
    LEFT JOIN flowers ON commemorative.commemorativeID = flowers.commemorativeID
    WHERE userID = ?`
    const commemorative = await dal.execute(sql, [userID])
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

    let sql = `INSERT INTO commemorative VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`
    const info: OkPacket = await dal.execute(sql, [
        commemorative.deceasedName,
        commemorative.userID,
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
        commemorative.views,
        commemorative.lastWatched
    ])

    commemorative.commemorativeID = info.insertId;
    commemorative.graveImageName = appConfig.nodeUrl + commemorative.graveImageName;
    commemorative.deceaseImageName = appConfig.nodeUrl + commemorative.deceaseImageName;
    
    return commemorative;
}

async function updateCommemorative (commemorative: CommemorativeModel){
    
    const err = commemorative.validation();
    if(err) throw new ValidationErrorModel(err);
    
    const oldCommemorative = await getCommemorativeByID(commemorative.commemorativeID);

    let sql = `
        UPDATE commemorative SET 
            deceasedName = ?, 
            userID = ?,
            biography = ?, 
            about = ?, 
            deceaseImageName = ?, 
             
            `

    if(commemorative.deceaseImage){
        sql += `, deceaseImageName = ?`
        commemorative.deceaseImageName =  appConfig.nodeUrl + await fileHandler.saveFile(commemorative.deceaseImage);
        delete commemorative.deceaseImage;

        fileHandler.deleteFile(oldCommemorative.deceaseImageName);
    }

    sql += `
        language = ?, 
        birthDate = ?, 
        deathDate = ?, 
        state = ?, 
        partnerType = ?, 
        partnerName = ?, 
        fatherName = ?, 
        motherName = ?, 
        childrenNames = ?, 
        graveImageName = ?, 
        graveYardName = ?,`

    if(commemorative.graveImage){
        sql += `, graveImageName = ?`
        commemorative.graveImageName =  appConfig.nodeUrl + await fileHandler.saveFile(commemorative.graveImage);
        delete commemorative.graveImage;

        fileHandler.deleteFile(oldCommemorative.graveImageName);
    }

    sql += `
        locationLink = ?, 
        lastWatched = NOW() 
        WHERE commemorativeID = ?`

    
    await dal.execute(sql, [
        commemorative.deceasedName,
        commemorative.userID,
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
        commemorative.views,
        commemorative.lastWatched,
        commemorative.commemorativeID
    ])

    return commemorative;
}

async function deleteCommemorative (commemorativeID: number){
    const oldCommemorative = await getCommemorativeByID(commemorativeID);

    fileHandler.deleteFile(oldCommemorative.deceaseImageName);
    fileHandler.deleteFile(oldCommemorative.graveImageName);

    const sql = `DELETE FROM commemorative WHERE commemorativeID = ?`
    await dal.execute(sql, [commemorativeID]);
}

export default {
    getRandomCommemorative,
    getCommemorativeByID,
    addCommemorative,
    updateCommemorative,
    deleteCommemorative,
    getCommemorativeByUser
}