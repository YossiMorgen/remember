import dal from "../../2-utils/dal";
import FlowersModel from "../../4-models/commemorations-models/flowers-model";

async function addFlower(commemorativeID: number, userID: number) {
    const sql = `
        UPDATE flowers 
        SET amount = amount + 1, 
        lastUpdate = NOW()
        WHERE commemorationSiteID = ? AND userID = ?`;

    const info = await dal.execute(sql, [commemorativeID, userID]);

    if (info.affectedRows === 0) {
        const sql = `
            INSERT INTO flowers 
            VALUES (DEFAULT, ?, ?, NOW())`;

        const info = await dal.execute(sql, [commemorativeID, userID]);
    }

}

async function sumFlowersAmountByCommemorativeID(commemorativeID: number) {
    const sql = `
        SELECT SUM(amount) AS amount FROM flowers
        WHERE commemorativeID = ?`;

    const flowersAmount = await dal.execute(sql, [commemorativeID]);

    return flowersAmount[0].amount;
}

export default { addFlower, sumFlowersAmountByCommemorativeID };