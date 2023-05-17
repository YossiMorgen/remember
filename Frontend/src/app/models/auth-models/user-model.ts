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

    public constructor (user : User | any){
        this.userID = user.userID;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.state = user.state;
        this.city = user.city;
        this.role = user.role;
        this.birthDate = user.birthDate;
    }
}


export default User