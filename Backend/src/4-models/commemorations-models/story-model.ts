import Joi from "joi";

export default class StoryModel{
    public commemorativeID: number;
    public storyID : number;
    public userID: number;
    public author: string;
    public story: Date;

    public constructor(story: StoryModel){
        this.commemorativeID = story.commemorativeID;
        this.storyID = story.storyID;
        this.userID = story.userID;
        this.author = story.author;
        this.story = story.story;
    }

    public static validationSchema = Joi.object({
        commemorativeID: Joi.number().optional().integer().positive(),
        storyID: Joi.number().optional().integer().positive(),
        userID: Joi.number().optional().integer().positive(),
        author: Joi.string().min(2).max(25).required(),
        story: Joi.string().min(2).max(200).required()
    })

    public validation():string{
        const res = StoryModel.validationSchema.validate(this);
        return res.error?.message;
    }
    
}