import db from "../config/db.js";

const findEmployeeById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    });
};

const updateEmployeeImageRecord = (id, imagePath) => {
    return new Promise((resolve, reject) => {
        db.run(
            "UPDATE users SET image = ? WHERE id = ?",
            [imagePath, id],
            function (err) {
                if (err) return reject(err);
                resolve(this.changes);
            }
        );
    });
};

export { findEmployeeById, updateEmployeeImageRecord };
