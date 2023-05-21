import express, {Request, Response, NextFunction } from "express";
import User from "../4-models/auth-models/user-model";
import authLogic from "../5-logic/auth-logic";
import CredentialsModel from "../4-models/auth-models/credentials-model";
import RoleModel from "../4-models/auth-models/role-model";

const router = express.Router() 

router.post("/auth/register", async (req: Request, res: Response, next: NextFunction) =>{
    try {
        
        req.body.image = req.files?.image;

        const user = new User(req.body);
        
        user.role = RoleModel.user;
        
        const token = await authLogic.register(user);
        res.status(201).json(token);

    } catch (error) {
        next(error);
    }
})

router.post("/auth/login", async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const credentials = new CredentialsModel(req.body);
        const token = await authLogic.login(credentials);
        
        res.json(token);
    } catch (error) {
        next(error);
    }
})

router.get("/auth/is_email_exist/:email", async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const email = req.params.email;
        const bool = await authLogic.isEmailExist(email)
        res.send(bool)
    } catch (error) {
        next(error);
    }
})

// router.patch("/auth/:id", verifyUser, async(req: Request, res: Response, next: NextFunction) =>{
//     try {
//         const id = +req.params.id;
//         const user = new User(req.body);
//         user.userId = id;
//         console.log(user);
        
//         const token = await authLogic.updateUser(user);                
//         res.status(201).json(token);
//     } catch (error) {
//         next(error);
//     }
// })

export default router;