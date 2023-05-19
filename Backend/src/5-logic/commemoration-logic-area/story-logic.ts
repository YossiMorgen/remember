import dal from "../../2-utils/dal";
import StoryModel from "../../4-models/commemorations-models/story-model";
import { ValidationErrorModel } from "../../4-models/error-models";

async function getCommemorativeStories(commemorativeID: number) {
    const sql = `SELECT * FROM stories WHERE commemorativeID = ?`;
    const commemorativeStories = await dal.execute(sql, [commemorativeID]);
    return commemorativeStories;
}

async function addCommemorativeStory(story: StoryModel) {
    const err = story.validation();
    if (err) throw new ValidationErrorModel(err);

    const sql = `INSERT INTO stories VALUES (DEFAULT, ?, ?, ?, ?)`;
    const info = await dal.execute(sql, [story.commemorativeID, story.userID, story.author, story.story]);
    story.storyID = info.insertId;
    return story;
}

async function deleteCommemorativeStory(storyID: number, userID: number) {
    const sql = `DELETE FROM stories WHERE storyID = ? AND userID = ?`;
    await dal.execute(sql, [storyID, userID]);
}

export default { getCommemorativeStories, addCommemorativeStory, deleteCommemorativeStory };