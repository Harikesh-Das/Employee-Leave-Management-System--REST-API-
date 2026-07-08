
import db from "../config/db.js";

const saveRefreshToken= ({user_id, token, expires_at})=>{
    return new Promise( (resolve, reject)=>{
        db.run(
            `INSERT INTO refresh_tokens (user_id, token, expires_at)
            VALUES (?,?,?)`,
            [user_id,token,expires_at],
           function (err) {
                if(err){
                    return reject (err);
                }
                resolve(this.lastID);
           }
        );
    });
};

const findRefreshToken= (token)=>{
    return new Promise ((resolve,reject)=>{
        db.get(
            `SELECT * FROM refresh_tokens WHERE token=?`,
            [token],
            (err,row)=>{
                if (err){
                    return reject(err);
                }
                resolve(row);
            }
        );
    });
};

const deleteRefreshToken=(token)=>{
    return new Promise ((resolve, reject)=>{
        db.run(
            `DELETE FROM refresh_tokens WHERE token=?`,
            [token],
            function (err) {
                if (err){
                     return reject (err);
                }
                resolve (this.changes);
            }
        );
    });
};

export {saveRefreshToken,findRefreshToken,deleteRefreshToken};