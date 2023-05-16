import e from "express";
import dal from "../../2-utils/dal";

async function addCandle(commemorativeID: number, userID: number) {
    const sql = `UPDATE candles SET amount = amount + 1, lastUpdate = ? WHERE commemorativeID = ? AND userID = ?`;
    const info = await dal.execute(sql, [new Date(), commemorativeID, userID]);
    if (info.affectedRows === 0) {
        const sql = `INSERT INTO candles (commemorativeID, userID, amount, lastUpdate) VALUES (?, ?, 1, ?)`;
        await dal.execute(sql, [commemorativeID, userID, new Date()]);
    }
}

async function getCommemorativeCandles(commemorativeID: number) {
    const sql = `SELECT SUM(amount) AS candlesSum FROM candles WHERE commemorativeID = ?`;
    const candlesSum = await dal.execute(sql, [commemorativeID]);
    return candlesSum[0].candlesSum;
}

async function getUserCandles(userID: number) {
    const sql = `SELECT SUM(amount) AS candlesSum FROM candles WHERE userID = ?`;
    const candlesSum = await dal.execute(sql, [userID]);
    return candlesSum[0].candlesSum;
}

async function getCandlesSumPerCommemorative() {
    const sql = `SELECT commemorativeID, SUM(amount) AS candlesSum FROM candles GROUP BY commemorativeID`;
    const candlesSumPerCommemorative = await dal.execute(sql);
    return candlesSumPerCommemorative;
}

async function getCandlesSumPerUser() {
    const sql = `SELECT userID, SUM(amount) AS candlesSum FROM candles GROUP BY userID`;
    const candlesSumPerUser = await dal.execute(sql);
    return candlesSumPerUser;
}

export default { addCandle, getCommemorativeCandles, getUserCandles, getCandlesSumPerCommemorative, getCandlesSumPerUser };
