import { Router } from "express";
import deceaseImagesLogic from "../../5-logic/commemoration-logic-area/decease-images-logic";

const router = Router();

router.get('/decease_images/:commemorativeID', async (req, res, next) => {
    try {
        const commemorativeID = +req.params.commemorativeID;
        const deceaseImages = await deceaseImagesLogic.getAllDeceaseImages(commemorativeID);
        res.json(deceaseImages);
    } catch (error) {
        next(error);
    }
})

router.post('/add_decease_image', async (req, res, next) => {
    try {
        req.body.image = req.files?.image;
        const deceaseImage = req.body;
        const newDeceaseImage = await deceaseImagesLogic.addDeceaseImage(deceaseImage);
        res.status(201).json(newDeceaseImage);
    } catch (error) {
        next(error);
    }
})

router.delete('/delete_decease_image/:deceaseImageID', async (req, res, next) => {
    try {
        const deceaseImageID = +req.params.deceaseImageID;
        await deceaseImagesLogic.deleteDeceaseImage(deceaseImageID);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
})

export default router;