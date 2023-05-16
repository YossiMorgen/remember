import Joi from "joi";

class CredentialsModel {

    public email: string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.email = credentials.email;
        this.password = credentials.password;
    }

    public static validationSchema = Joi.object({
        email: Joi.string().required().min(2).max(30),
        password: Joi.string().required().min(4).max(30)
    });

    public validate(): string {
        const result = CredentialsModel.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default CredentialsModel;
