import Joi from "joi";

class CategoryModel {

    public categoryID: number;
    public categoryName: string;

    public constructor(category: CategoryModel) {
        this.categoryID = category.categoryID;
        this.categoryName = category.categoryName;
    }

    public static validationSchema = Joi.object({
        categoryID : Joi.number().required().positive(),
        categoryName: Joi.string().required()
    });

    public validate(): string {
        const result = CategoryModel.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default CategoryModel;
