import { Router } from "express";
import candlesLogic from "../../5-logic/commemoration-logic-area/candles-logic";
import cyber from "../../2-utils/cyber";

const router = Router();

router.get('/commemorative_candles/:id', async (req, res, next) => {
    try {
        const commemorativeID = +req.params.id;
        const commemorativeCandles = await candlesLogic.getCommemorativeCandles(commemorativeID);
        res.json(commemorativeCandles);
    } catch (error) {
        next(error);
    }
})

router.get('/candle_by_user/', async (req, res, next) => {
    try {
        const decodeUser = await cyber.getDecodeToken(req);
        const commemorativeCandle = await candlesLogic.getCandleByUser(decodeUser.userID);
        res.json(commemorativeCandle);
    } catch (error) {
        next(error);
    }
})


router.post('/add_candle/:commemorativeID()', async (req, res, next) => {
    try {
        const decodeUser = await cyber.getDecodeToken(req);
        const userID = decodeUser.userID;
        const commemorativeID = +req.params.commemorativeID;
        const newCandle = await candlesLogic.addCandle(commemorativeID, userID);
        res.status(201).json(newCandle);
    } catch (error) {
        next(error);
    }
})

export default router;