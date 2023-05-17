import dal from "../../2-utils/dal";

async function sumCommemorativeCandles(commemorativeID: number) {
    const sql = `SELECT SUM(amount) AS candlesSum FROM candles WHERE commemorativeID = ?`;
    const candlesSum = await dal.execute(sql, [commemorativeID]);
    return candlesSum[0].candlesSum;
}

async function addCandle(commemorativeID: number, userID: number) {
    const sql = `UPDATE candles SET amount = amount + 1 WHERE commemorativeID = ? AND userID = ?`;
    const info = await dal.execute(sql, [new Date(), commemorativeID, userID]);
    if (info.affectedRows === 0) {
        const sql = `INSERT INTO candles (commemorativeID, userID, amount, lastUpdate) VALUES (?, ?, 1, ?)`;
        await dal.execute(sql, [commemorativeID, userID, new Date()]);
    }
}

export default { addCandle, sumCommemorativeCandles };
