import mysql from "mysql";
import appConfig from "./AppConfig";

const connection = mysql.createPool({
    host: appConfig.host,
    user: appConfig.username,
    password : appConfig.password,
    database : appConfig.database,
});

function execute(sql: string, values?:any[] ): Promise<any>{
    return new Promise(( resolve, reject ) => {
        connection.query(sql, values, ( err, result ) => {
            if( err ){
                reject(err);
                return;
            }
            resolve(result);
        })
    });
}

export default {
    execute
}
