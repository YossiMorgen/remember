import dal from "../../2-utils/dal";
import FlowersModel from "../../4-models/commemorations-models/flowers-model";

async function addFlower(flower: FlowersModel) {
    const sql = `
        UPDATE commemorationSites 
        SET amount = amount + 1, 
        lastFlowerDate = NOW()
        WHERE commemorationSiteID = ? AND userID = ?`;

}
