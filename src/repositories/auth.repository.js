import db from "../config/db.js";

const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT * FROM users WHERE email = ?",
            [email],
            (err, row) => {
                if (err) {
                    return reject(err);
                }

                resolve(row);
            }
        );
    });
};

const createUser = ({ name, email, password_hash, department, role }) => {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO users
            (name, email, password_hash, department, role)
            VALUES (?, ?, ?, ?, ?)`,
            [name, email, password_hash, department, role],
            function (err) {
                if (err) {
                    return reject(err);
                }

                resolve(this.lastID);
            }
        );
    });
};

const findUserById = (id) => {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT * FROM users WHERE id = ?",
            [id],
            (err, row) => {
                if (err) {
                    return reject(err);
                }

                resolve(row);
            }
        );
    });
};

const updateEmployeeId=(id, employee_id)=>{
    return new Promise ((resolve, reject)=>{
        db.run(
            `UPDATE users 
            SET employee_id=?
            WHERE id=?`,
            [employee_id,id],
            function (err){
                if (err){
                    return reject (err);
                }
                resolve (this.changes);
            }
        )
        
    });
}

export {
    findUserByEmail,
    createUser,
    findUserById,
    updateEmployeeId
};