import { Router } from "express";
import storyLogic from "../../5-logic/commemoration-logic-area/story-logic";
import cyber from "../../2-utils/cyber";
import StoryModel from "../../4-models/commemorations-models/story-model";

const router = Router();

router.get('/get_commemorative_stories/:commemorativeID([0-9]+)', async (req, res, next) => {
    try {
        const offset = +req.query.offset;
        const commemorativeID = +req.params.commemorativeID;
        const commemorativeStories = await storyLogic.getCommemorativeStories(commemorativeID, offset);
        res.json(commemorativeStories);
    } catch (error) {
        next(error);
    }  
})

router.post('/add_story', async (req, res, next) => {
    try {
        const story = new StoryModel(req.body);
        const decodeUser = await cyber.getDecodeToken(req);
        story.userID = decodeUser.userID;
        const newStory = await storyLogic.addCommemorativeStory(story);
        res.status(201).json(newStory);
    } catch (error) {
        next(error);
    }
})

router.put('/update_story', async (req, res, next) => {
    try {
        const story = new StoryModel(req.body);
        const decodeUser = await cyber.getDecodeToken(req);
        story.userID = decodeUser.userID;
        const updatedStory = await storyLogic.updateCommemorativeStory(story);
        res.json(updatedStory);
    } catch (error) {
        next(error);
    }
})

router.delete('/delete_story/:storyID([0-9]+)', async (req, res, next) => {
    try {
        const storyID = +req.params.storyID;
        const decodeUser = await cyber.getDecodeToken(req);
        await storyLogic.deleteCommemorativeStory(storyID, decodeUser.userID, decodeUser.role === 'admin');
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
})

export default router;