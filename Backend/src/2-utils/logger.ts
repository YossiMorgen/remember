import path from "path";
import fs from "fs/promises";

const activitiesFile = path.join(__dirname, "..", "1-assets/logs/activities", "activities.txt");
const errorsFile = path.join(__dirname, "..", "1-assets/logs/errors", "errors.txt");


async function logActivity(message: string):Promise <void> {
    const now = new Date();
    const msgToLog = `${now.toLocaleString()}\t${message}\n--------------------------------------------------\n`;
    await fs.appendFile(activitiesFile, msgToLog);
}

async function logError(message: string, err?: any):Promise <void> {
    const now = new Date();
    let msgToLog = `${now.toUTCString()} \t ${message}`;
    if(typeof err === "string") msgToLog += err + "\n"; 
    if (err?.stack) msgToLog += `Stack: ${err.stack}\n`;
    msgToLog += "----------------------------------------------------------------------------------------------------\n";
    await fs.appendFile(errorsFile, msgToLog); 
}
export default {
    logError,
    logActivity
};
