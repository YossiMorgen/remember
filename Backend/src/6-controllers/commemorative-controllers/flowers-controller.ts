import { Router } from "express";
import flowersLogic from "../../5-logic/commemoration-logic-area/flowers-logic";
import cyber from "../../2-utils/cyber";

const router = Router();

router.get('/user_flowers/:commemorativeID([0-9]+)', async (req, res, next) => {
    try {
        const commemorativeID = +req.params.commemorativeID;
        const decodeUser = await cyber.getDecodeToken(req);
        const userFlowers = await flowersLogic.getFlowerByUserAndCommemorativeID(commemorativeID, decodeUser.userID);
        res.json(userFlowers);
    } catch (error) {
        next(error);
    }
})

router.post('/add_flower/commemorativeID([0-9]+)', async (req, res, next) => {
    try {
        const commemorativeID = +req.params.commemorativeID;
        const decodeUser = await cyber.getDecodeToken(req);
        const newFlower = await flowersLogic.addFlower(commemorativeID, decodeUser.userID);
        res.status(201).json(newFlower);
    } catch (error) {
        next(error);
    }
})

router.get('flowers_amount/:commemorativeID([0-9]+)', async (req, res, next) => {
    try {
        const commemorativeID = +req.params.commemorativeID;
        const flowersAmount = await flowersLogic.getFlowersAmountByCommemorativeID(commemorativeID);
        res.json(flowersAmount);
    } catch (error) {
        next(error);
    }
})

export default router;