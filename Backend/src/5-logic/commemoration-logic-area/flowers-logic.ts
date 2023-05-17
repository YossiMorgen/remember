import dal from "../../2-utils/dal";
import FlowersModel from "../../4-models/commemorations-models/flowers-model";

async function addFlower(flower: FlowersModel) {
    const sql = `
        UPDATE flowers 
        SET amount = amount + 1, 
        lastUpdate = NOW()
        WHERE commemorationSiteID = ? AND userID = ?`;

    const info = await dal.execute(sql, [flower.commemorativeID, flower.userID]);

    if (info.affectedRows === 0) {
        const sql = `
            INSERT INTO flowers 
            VALUES (DEFAULT, ?, ?, NOW())`;

        const info = await dal.execute(sql, [flower.commemorativeID, flower.userID]);
    }

}

async function getFlowersAmountByCommemorativeID(commemorationSiteID: number) {
    const sql = `
        SELECT SUM(amount) AS amount FROM flowers
        WHERE commemorationSiteID = ?`;

    const flowersAmount = await dal.execute(sql, [commemorationSiteID]);

    return flowersAmount[0].amount;
}