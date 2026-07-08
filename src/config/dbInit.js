import db from './db.js';


//Creating a table if it doesn't exist in the first place
export const initializeDatabase = () => {
    const userSql = `
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

    const refreshTokenSql = `
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token TEXT NOT NULL UNIQUE,
    expires_at DATETIME NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`;

    // Return a promise to allow async initialization handling
    return new Promise((resolve, reject) => {
        db.run(userSql, (err) => {
            if (err) {
                console.error('Database initialization error:', err);
                reject(err);
            } 
        db.run(refreshTokenSql, (err) => {
                    if (err) {
                        console.error('Refresh token database not initialized', err);
                        reject(err);
                    }
        console.log('Table has been created if it does not exist.');
        resolve();
                    
                });
            
        });
    });
};