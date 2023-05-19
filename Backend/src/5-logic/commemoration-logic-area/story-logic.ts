import dal from "../../2-utils/dal";
import StoryModel from "../../4-models/commemorations-models/story-model";

async function getCommemorativeStories(commemorativeID: number) {
    const sql = `SELECT * FROM stories WHERE commemorativeID = ?`;
    const commemorativeStories = await dal.execute(sql, [commemorativeID]);
    return commemorativeStories;
}

async function addCommemorativeStory(story: StoryModel) {
    const sql = `INSERT INTO stories VALUES (DEFAULT, ?, ?, ?)`;
    const info = await dal.execute(sql, [story.commemorativeID, story.author, story.story]);
    story.storyID = info.insertId;
    return story;
}

async function deleteCommemorativeStory(storyID: number) {
    const sql = `DELETE FROM stories WHERE storyID = ?`;
    await dal.execute(sql, [storyID]);
}

export default { getCommemorativeStories, addCommemorativeStory, deleteCommemorativeStory };