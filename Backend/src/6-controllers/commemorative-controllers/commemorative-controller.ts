import { Router, NextFunction, Request, Response } from "express";
import commemorativeLogic from "../../5-logic/commemoration-logic-area/commemorative-logic";
import CommemorativeModel from "../../4-models/commemorations-models/commemorative-model";
import { UploadedFile } from "express-fileupload";
import verifyLoggedIn from "../../3-middleware/verify-logged-in";
import cyber from "../../2-utils/cyber";

const router = Router();

router.get('/random_commemorative', async (req, res, next) => {
    try {
        const language = req.query.language as string;
        const offset = +req.query.offset;
        const commemorative = await commemorativeLogic.getRandomCommemorative(offset, language);
        res.json(commemorative);
    } catch (error) {
        next(error);
    }
})

router.get('/commemorative_by_id/:id([0-9]+)', async (req, res, next) => {
    try {
        const commemorativeID = +req.params.id;
        const commemorative = await commemorativeLogic.getCommemorativeByID(commemorativeID);
        res.json(commemorative);
    } catch (error) {
        next(error);
    }
})

router.get('/commemorative_by_user/:userID([0-9]+)', async (req, res, next) => {
    try {
        const userID = +req.params.userID;
        const commemorative = await commemorativeLogic.getCommemorativeByUser(userID);
        res.json(commemorative);
    } catch (error) {
        next(error);
    }
})

router.post('/add_commemorative', async (req, res, next) => {
    try {
        const commemorative = new CommemorativeModel(req.body);
        commemorative.userID = cyber.getDecodeToken(req)?.['userID'];
        commemorative.graveImage = req.files.graveImage as UploadedFile;
        commemorative.deceaseImage = req.files?.deceaseImage as UploadedFile;
        
        const newCommemorative = await commemorativeLogic.addCommemorative(commemorative);
        res.status(201).json(newCommemorative);
    } catch (error) {
        next(error);
    }
})

router.put('/update_commemorative/:id([0-9]+)', verifyLoggedIn, async (req, res, next) => {
    try {
        req.body.graveImage = req.files?.graveImage;
        req.body.deceaseImage = req.files?.deceaseImage;
        
        const commemorative = new CommemorativeModel(req.body);
        commemorative.commemorativeID = +req.params.id;

        const updatedCommemorative = await commemorativeLogic.updateCommemorative(commemorative);
        res.json(updatedCommemorative);
    } catch (error) {
        next(error);
    }
})

router.delete('/delete_commemorative/:id([0-9]+)', verifyLoggedIn, async (req, res, next) => {
    try {
        const commemorativeID = +req.params.id;
        await commemorativeLogic.deleteCommemorative(commemorativeID);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }   
})

export default router;