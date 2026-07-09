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
            role TEXT NOT NULL DEFAULT 'employee'
                CHECK(role IN ('employee', 'manager')),
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

const leavesSql=`
 CREATE TABLE IF NOT EXISTS leave_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_id INTEGER NOT NULL,
            leave_type TEXT NOT NULL CHECK (leave_type IN ('Casual', 'Sick', 'Earned Leave')),
            start_date TEXT NOT NULL,
            end_date TEXT NOT NULL,
            total_days INTEGER NOT NULL,
            reason TEXT,
            status TEXT NOT NULL DEFAULT 'Pending'
                CHECK (status IN ('Pending', 'Approved', 'Rejected', 'Cancelled')),
            manager_id INTEGER,
            manager_comment TEXT,
            applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            action_at TEXT,
            cancelled_at TEXT
        );`
const leaveBalanceSql=`
 CREATE TABLE IF NOT EXISTS leave_balances (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_id INTEGER NOT NULL,
            leave_type TEXT NOT NULL CHECK (leave_type IN ('Casual', 'Sick', 'Earned Leave')),
            total_days INTEGER NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(employee_id, leave_type)
        );

        CREATE INDEX IF NOT EXISTS idx_leave_requests_employee_id
            ON leave_requests(employee_id);

        CREATE INDEX IF NOT EXISTS idx_leave_requests_status
            ON leave_requests(status);
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
        db.run(leavesSql,(err)=>{
            if (err){
                console.error('Leaves database not initialized.',err);
                reject(err);
            }
        db.run(leaveBalanceSql,(err)=>{
            if (err){
                console.error('Leave Balance database not initialized.',err);
                reject(err);
            }
        })
        })
        console.log('Table has been created if it does not exist.');
        resolve();
                    
                });
            
        });
    });
};