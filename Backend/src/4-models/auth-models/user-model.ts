import Joi from "joi";
import RoleModel from './role-model';



class User{
    public userID: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public city : string;
    public address : string;
    public role: RoleModel;

    constructor(user: User) {
        this.userID = user.userID;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.city = user.city;
        this.address = user.address;
        this.role = RoleModel.user;
    }

    public static validationSchema = Joi.object({
        userID: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(30),
        lastName: Joi.string().required().min(2).max(30),
        email: Joi.string().required().min(2).max(30),
        password: Joi.string().required().min(2).max(30),
        city: Joi.string().required().min(2).max(30),
        address: Joi.string().required().min(2).max(30),
        role: Joi.string().valid(...Object.values(RoleModel)),
    })

    public validation():string{
        const res = User.validationSchema.validate(this);
        return res.error?.message;
    }
}
export default User