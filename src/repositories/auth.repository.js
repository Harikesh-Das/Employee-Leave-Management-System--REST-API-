import db from "../config/db.js";

// Find a user row by email
const findUserByEmail = (email) => {
    // Return a promise that resolves with the user row or rejects on error
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

// Create a new user in the database
const createUser = ({ name, email, password_hash, department, role }) => {
    // Return a promise that resolves with the inserted row ID or rejects on error
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

// Find a user row by ID
const findUserById = (id) => {
    // Return a promise that resolves with the user row or rejects on error
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

// Update the employee_id for a specific user record
const updateEmployeeId = (id, employee_id) => {
    // Return a promise that resolves with the number of changed rows or rejects on error
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE users 
            SET employee_id=?
            WHERE id=?`,
            [employee_id, id],
            function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(this.changes);
            }
        );
    });
};

export {
    findUserByEmail,
    createUser,
    findUserById,
    updateEmployeeId
};