import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import appConfig from "./AppConfig";

async function saveFile(file: UploadedFile){
    const ext = path.extname(file.name);
    const fileName = uuidv4() + ext;        
    await file.mv("./src/1-assets/images/" + fileName);
    return fileName;
}

function deleteFile(fileName: string):void{    
    if(fs.existsSync("./src/1-assets/images/" + fileName)){
       fs.unlinkSync("./src/1-assets/images/" + fileName);
    }
}

function fileExists(fileName: string):boolean{
    if(fs.existsSync("./src/1-assets/images" + fileName)){
        return true;
    }
    return false;
}

export default {
    saveFile,
    deleteFile,
    fileExists
}