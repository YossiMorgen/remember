import dal from "../../2-utils/dal";
import StoryModel from "../../4-models/commemorations-models/story-model";
import { ValidationErrorModel } from "../../4-models/error-models";

async function getCommemorativeStories(commemorativeID: number, offset: number) {
    const sql = `
        SELECT * FROM stories 
        WHERE commemorativeID = ?
        ORDER BY storyID DESC
        LIMIT 5 OFFSET ?;`;
    const commemorativeStories = await dal.execute(sql, [commemorativeID, offset]);
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

async function updateCommemorativeStory(story: StoryModel) {
    const err = story.validation();
    if (err) throw new ValidationErrorModel(err);

    const sql = `UPDATE stories SET author = ?, story = ? WHERE storyID = ? AND userID = ?`;
    await dal.execute(sql, [story.author, story.story, story.storyID, story.userID]);

    return story;
}

async function deleteCommemorativeStory(storyID: number, userID: number, isAdmin: boolean) {
    let sql = `DELETE FROM stories WHERE storyID = ?`;
    const arr = [storyID];
    if (!isAdmin) {
        sql += ` AND userID = ?`;
        arr.push(userID);
    }
    await dal.execute(sql, arr);
}

export default { getCommemorativeStories, addCommemorativeStory, updateCommemorativeStory, deleteCommemorativeStory };