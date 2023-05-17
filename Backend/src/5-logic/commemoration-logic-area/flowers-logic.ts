import dal from "../../2-utils/dal";
import FlowersModel from "../../4-models/commemorations-models/flowers-model";

async function getFlowerByUserAndCommemorativeID(userID: number, commemorativeID: number) {
    const sql = `SELECT * FROM flowers WHERE userID = ? AND commemorationSiteID = ?`;
    const [flower] = await dal.execute(sql, [userID, commemorativeID]);
    return flower;
}


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

export default { getFlowerByUserAndCommemorativeID, addFlower, getFlowersAmountByCommemorativeID };