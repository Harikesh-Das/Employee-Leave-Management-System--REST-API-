import db from './db.js';


//Creating a table if it doesn't exist in the first place
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
        );

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
        );

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
        db.exec(sql, (err) => {
            if (err) {
                console.error('Database initialization error:', err);
                reject(err);
            } else {
                console.log('Tables have been created if they do not exist.');
                resolve();
            }
        });
    });
};

db.all(`SELECT * FROM users`, [], (err, rows) => {
   if(err) {
    console.error(err);
    return;
   }  
   console.log("All existing users:", rows);
});





/*
db.run(`DELETE FROM users`, (err, result) => {
     if(err) {
    console.error(err);
    return;
   }  
  console.log(`deleted user records`, result)
});



db.run(`DELETE FROM leave_requests`, (err, result) => {
     if(err) {
    console.error(err);
    return;
   }  
  console.log(`deleted leave records`, result);

});
*/
