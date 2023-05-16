import { ValidationErrorModel } from '../4-models/error-models';
import {Request, Response, NextFunction } from "express";
import cyber from "../2-utils/cyber";
import { AuthErrorModel } from "../4-models/error-models";

async function verifyAdmin(req: Request, res: Response, next: NextFunction){
    try {

        const decodeUser = await cyber.getDecodeToken(req);
        if( decodeUser.role === 'user'){
            throw new ValidationErrorModel('as user you are not allowed to access this resource');
        } 

        next();
    } catch (error) {
        next(error);
    }
}

export default verifyAdmin;