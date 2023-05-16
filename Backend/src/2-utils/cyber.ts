import { AuthErrorModel } from './../4-models/error-models';
import { Request } from 'express';
import User from "../4-models/auth-models/user-model";
import jwt from "jsonwebtoken"
import crypto from "crypto";

const jwtSecretKey = "sapHacker?";
const salt = 'niceSpice!!';

function getJwtToken(user: User): string {
    delete user.password;
    
    const container = { user };
    const options = {expiresIn: "7h"};
    const token = jwt.sign(container, jwtSecretKey, options);

    return token;
}

function verifyJwtToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            const header = request.header("authorization");
            if(!header){
                resolve(false);
                return;
            } 
            
            const token = header.substring(7);

            if(!token){
                resolve(false);
                return;
            }

            jwt.verify(token, jwtSecretKey, err => {
                if(err){
                    resolve(false);
                    return;
                }
                resolve(true);
            });

        } catch (error) {
            reject(error);
        }
    
    })
}

function hash(plainText: string): string {
    if(!plainText) return null;

    return crypto.createHmac('sha512', salt).update(plainText).digest('hex');

}

async function getDecodeToken(req: Request):Promise <User>{
    const isValid = await verifyJwtToken(req);
    
    if(!isValid) throw new AuthErrorModel("you ain't logged in");   

    const decodeUser: User = jwt.decode(req.header("authorization").substring(7))["user"];
    
    return decodeUser;
}

export default {
    getJwtToken,
    verifyJwtToken,
    hash,
    getDecodeToken
}

