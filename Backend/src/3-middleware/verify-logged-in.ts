import {Request, Response, NextFunction } from "express";
import cyber from "../2-utils/cyber";
import { AuthErrorModel } from "../4-models/error-models";

async function verifyLoggedIn(req: Request, res: Response, next: NextFunction){
    try {
        const isValid = await cyber.verifyJwtToken(req);
        if(!isValid) throw new AuthErrorModel("you ain't logged in");
        
        next();
    } catch (error) {
        next(error);
    }
}

export default verifyLoggedIn;