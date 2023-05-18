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
            commemorative.commemorativeID, 
            commemorative.userID,
            deceasedName, 
            CONCAT(?, deceaseImageName) AS deceaseImageName,
            (SELECT SUM(flowers.amount) FROM flowers WHERE commemorative.commemorativeID = flowers.commemorativeID) AS flowersAmount,
            (SELECT SUM(candles.amount) FROM candles WHERE commemorative.commemorativeID = candles.commemorativeID) AS candlesAmount
        FROM commemorative
        LEFT JOIN candles ON commemorative.commemorativeID = candles.commemorativeID
        LEFT JOIN flowers ON commemorative.commemorativeID = flowers.commemorativeID
        WHERE language = ?
        LIMIT ?
        OFFSET ?
    `

    const commemorative = await dal.execute(sql, [appConfig.nodeUrl, language, 20, 0])
    console.log(commemorative);
    
    return commemorative;

}

async function getCommemorativeByID(commemorativeID: number){
    const sql = ` 
        SELECT 
            commemorative.commemorativeID, 
            commemorative.userID,
            deceasedName, 
            biography, 
            about, 
            CONCAT(?, deceaseImageName) AS deceaseImageName,
            language, 
            birthDate, 
            deathDate, 
            state, 
            city,
            partnerType, 
            partnerName, 
            fatherName, 
            motherName, 
            childrenNames, 
            CONCAT(?, graveImageName) AS graveImageName, 
            graveYardName, 
            locationLink, 
            views, 
            lastWatched,
            SUM(flowers.amount) AS flowersAmount,
            SUM(candles.amount) AS candlesAmount
        FROM commemorative 
        LEFT JOIN candles ON commemorative.commemorativeID = candles.commemorativeID
        LEFT JOIN flowers ON commemorative.commemorativeID = flowers.commemorativeID
        WHERE commemorative.commemorativeID = ?`
    const [commemorative] = await dal.execute(sql, [appConfig.nodeUrl, appConfig.nodeUrl, commemorativeID])

    if(commemorative.length === 0) throw new ValidationErrorModel("No commemorative found with this ID");
    return commemorative;
}

async function getCommemorativeByUser(userID: number){
    const sql = `  
    SELECT 
        commemorative.commemorativeID, 
        commemorative.userID,
        deceasedName, 
        biography, 
        about, 
        CONCAT(?, deceaseImageName) AS deceaseImageName,
        language, 
        birthDate, 
        deathDate, 
        state, 
        city,
        partnerType, 
        partnerName, 
        fatherName, 
        motherName, 
        childrenNames,
        CONCAT(?, graveImageName) AS graveImageName, 
        graveYardName, 
        locationLink, 
        views, 
        lastWatched,
        SUM(flowers.amount) AS flowersAmount,
        SUM(candles.amount) AS candlesAmount
    FROM commemorative 
    LEFT JOIN candles ON commemorative.commemorativeID = candles.commemorativeID
    LEFT JOIN flowers ON commemorative.commemorativeID = flowers.commemorativeID
    WHERE commemorative.userID = ?`
    const commemorative = await dal.execute(sql, [appConfig.nodeUrl, appConfig.nodeUrl, userID])

    if(commemorative.length === 0) throw new ValidationErrorModel("No commemorative found");
    return commemorative;
}

async function addCommemorative (commemorative: CommemorativeModel){

    const err = commemorative.validation();
    if(err) throw new ValidationErrorModel(err);
    
    commemorative.deceaseImageName = await fileHandler.saveFile(commemorative.deceaseImage);
    commemorative.graveImageName = await fileHandler.saveFile(commemorative.graveImage);

    delete commemorative.deceaseImage;
    delete commemorative.graveImage;

    let sql = `INSERT INTO commemorative VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`
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
        commemorative.city,
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
   
    let oldCommemorative: CommemorativeModel;
    if(commemorative.deceaseImage || commemorative.graveImage){
        oldCommemorative = await getCommemorativeByID(commemorative.commemorativeID);
    }
   
    console.log(commemorative.deceaseImageName);
    
    if(commemorative.deceaseImage){
        fileHandler.deleteFile(oldCommemorative.deceaseImageName);
        commemorative.deceaseImageName = await fileHandler.saveFile(commemorative.deceaseImage);
        delete commemorative.deceaseImage;
    }

    console.log(commemorative.deceaseImageName);
    

    if(commemorative.graveImage){
        fileHandler.deleteFile(oldCommemorative.graveImageName);
        commemorative.graveImageName = await fileHandler.saveFile(commemorative.graveImage);
        delete commemorative.graveImage;
    }
    
    let sql = `
        UPDATE commemorative SET 
        deceasedName = ?, 
        biography = ?, 
        about = ?, 
        deceaseImageName = ?,
        language = ?, 
        birthDate = ?, 
        deathDate = ?, 
        state = ?, 
        city = ?,
        partnerType = ?, 
        partnerName = ?, 
        fatherName = ?, 
        motherName = ?, 
        childrenNames = ?, 
        graveYardName = ?,
        graveImageName = ?,
        locationLink = ?
        WHERE commemorativeID = ? AND userID = ?
    `

    let arr = [
        commemorative.deceasedName,
        commemorative.biography,
        commemorative.about,
        commemorative.deceaseImageName,
        commemorative.language,
        commemorative.birthDate + '',
        commemorative.deathDate + '',
        commemorative.state,
        commemorative.city,
        commemorative.partnerType,
        commemorative.partnerName,
        commemorative.fatherName,
        commemorative.motherName,
        commemorative.childrenNames,
        commemorative.graveYardName,
        commemorative.graveImageName,        
        commemorative.locationLink,
        commemorative.commemorativeID,
        commemorative.userID
    ]


    const info: OkPacket = await dal.execute(sql, arr);
    
    if(!info.affectedRows) throw new ValidationErrorModel('commemorative does not exist');
    
    commemorative.graveImageName = appConfig.nodeUrl + commemorative.graveImageName;
    commemorative.deceaseImageName = appConfig.nodeUrl + commemorative.deceaseImageName;

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