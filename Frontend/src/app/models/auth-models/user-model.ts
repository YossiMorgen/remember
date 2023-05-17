import RoleModel from './role-model';



class User{
    public userID: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: RoleModel;
    public state : string;
    public city : string;
    public birthDate: Date;

}
export default User