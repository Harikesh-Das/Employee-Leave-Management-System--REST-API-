import sqlite3 from "sqlite3";
import env from "./env.js";

sqlite3.verbose();

const db= new sqlite3.Database(env.db.file,(err)=> {
    if(err){
        console.error("Failed to connect with SQLite", err.message);
        process.exit(1);
    }
    else{
        console.log(`Successfully connected to ${env.db.file}`)
    }
});

export default db;