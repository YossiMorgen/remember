import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import User from "../4-models/auth-models/user-model";
import cyber from "../2-utils/cyber";
import CredentialsModel from "../4-models/auth-models/credentials-model";
import RoleModel from "../4-models/auth-models/role-model"
async function register(user : User) {

    const error = user.validation();
    if(error)  throw new ValidationErrorModel(error);

    if(await isEmailExist(user.email)) throw new ValidationErrorModel(`email ${user.email} already exists`);
    
    user.role = RoleModel.user;
    
    user.password = cyber.hash(user.password);
    const sql = `INSERT INTO users VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const info: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password, user.role, user.state, user.city, user.birthDate, user.ip]);

    user.userID = info.insertId;
    delete user.password;
    
    const token = cyber.getJwtToken(user)
    return token;
}

async function isEmailExist(email: string): Promise<boolean> {
    const sql = `SELECT COUNT(*) as email FROM users WHERE email = ?`;
    const count = await dal.execute(sql,[email]);
    
    return count[0].email > 0;
}

async function login(credentials: CredentialsModel):Promise<string> {

    const error = credentials.validate();
    if(error) throw new ValidationErrorModel(error);
    
    credentials.password = cyber.hash(credentials.password);

    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`
    const users = await dal.execute(sql, [credentials.email, credentials.password ]);
    if(users.length === 0) throw new ValidationErrorModel(`incorrect email or password`);
    
    const user = users[0];
    delete user.password;
   
    const token = cyber.getJwtToken(user);
    
    return token;

}

export default {
    register,
    login,
    isEmailExist
}