import { Router } from "express";
import commemorationSitesLogic from "../../5-logic/commemoration-logic-area/commemoration-sites-logic";
import CommemorationSitesModel from "../../4-models/commemorations-models/commemoration-site-model";
import appConfig from "../../2-utils/AppConfig";
import { UploadedFile } from "express-fileupload";

const router = Router();

router.get('commemoration_sites/:commemorativeID', async (req, res, next) => {
    try {
        const commemorativeID = +req.params.commemorativeID;
        const commemorationSites = await commemorationSitesLogic.getAllCommemorationSitesByCommemorativeID(commemorativeID);
    } catch (error) {
        next(error);
    }
})

router.get('commemoration_site/:commemorationSiteID', async (req, res, next) => {
    try {
        const commemorationSiteID = +req.params.commemorationSiteID;
        const commemorationSite : CommemorationSitesModel = await commemorationSitesLogic.getCommemorationSiteByID(commemorationSiteID);
        commemorationSite.imageName = appConfig.nodeUrl + commemorationSite.imageName;

        res.json(commemorationSite);
    } catch (error) {
        next(error);
    }
})


router.post('/add_commemoration_site', async (req, res, next) => {
    try {
        const commemorationSite = new CommemorationSitesModel(req.body);
        commemorationSite.image = req.files?.image as UploadedFile;

        const newCommemorationSite = await commemorationSitesLogic.addCommemorationSite(commemorationSite);
        res.status(201).json(newCommemorationSite);
    } catch (error) {
        next(error);
    }
})

router.put('/update_commemoration_site/:id([0-9]+)', async (req, res, next) => {
    try {
        req.body.image = req.files?.image;

        const commemorationSite = new CommemorationSitesModel(req.body);
        commemorationSite.commemorationSiteID = +req.params.id;

        const updatedCommemorationSite = await commemorationSitesLogic.updateCommemorationSite(commemorationSite);
        res.json(updatedCommemorationSite);
    } catch (error) {
        next(error);
    }
})

router.delete('/delete_commemoration_site/:id([0-9]+)', async (req, res, next) => {
    try {
        const commemorationSiteID = +req.params.id;
        await commemorationSitesLogic.deleteCommemorationSite(commemorationSiteID);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
})

export default router;