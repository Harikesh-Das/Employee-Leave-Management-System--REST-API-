import db from './db.js';

export const initializeDatabase = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_id TEXT UNIQUE,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            department TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'user'
                CHECK(role IN ('user', 'admin')),
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    `;

    return new Promise((resolve, reject) => {
        db.run(sql, (err) => {
            if (err) {
                console.error('Database initialization error:', err);
                reject(err);
            } else {
                console.log('Users table created successfully');
                resolve();
            }
        });
    });
};