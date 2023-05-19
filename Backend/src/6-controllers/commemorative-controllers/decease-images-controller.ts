import { Router } from "express";
import deceaseImagesLogic from "../../5-logic/commemoration-logic-area/decease-images-logic";
import verifyLoggedIn from "../../3-middleware/verify-logged-in";
import DeceaseImagesModel from "../../4-models/commemorations-models/decease-images-model";
import cyber from "../../2-utils/cyber";

const router = Router();

router.get('/decease_images/:commemorativeID([0-9]+)', async (req, res, next) => {
    try {
        const commemorativeID = +req.params.commemorativeID;
        const deceaseImages = await deceaseImagesLogic.getAllDeceaseImages(commemorativeID);
        res.json(deceaseImages);
    } catch (error) {
        next(error);
    }
})

router.post('/add_decease_image', verifyLoggedIn, async (req, res, next) => {
    try {
        req.body.image = req.files?.image;
        const deceaseImage = new DeceaseImagesModel(req.body);
        const decodeUser = await cyber.getDecodeToken(req);
        deceaseImage.userID = decodeUser.userID;
        const newDeceaseImage = await deceaseImagesLogic.addDeceaseImage(deceaseImage);
        res.status(201).json(newDeceaseImage);
    } catch (error) {
        next(error);
    }
})

router.delete('/delete_decease_image/:deceaseImageID([0-9]+)', async (req, res, next) => {
    try {
        const deceaseImageID = +req.params.deceaseImageID;
        const decodeUser = await cyber.getDecodeToken(req);

        await deceaseImagesLogic.deleteDeceaseImage(deceaseImageID, decodeUser.userID, decodeUser.role === 'admin');
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
})

export default router;