import { NextFunction, Request, Response } from "express";
import logger from "../2-utils/logger";
import appConfig from "../2-utils/AppConfig";

function catchAll(err: any, request: Request, response: Response, next: NextFunction) {
    const status = err.status || 500;
    
    if(status === 500){
        logger.logError('error!!', err)
    }else{
        logger.logActivity(err)
    }
    console.log("cached");
    console.log(err);
    

    let message = err.message;

    if(appConfig.isProduction && status === 500){
        message = "Error!!";
    }

    response.status(status).send(message);

}
export default catchAll; 