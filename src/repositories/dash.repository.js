import db from '../config/db.js';

// Getting all leave stats together.
const getDashboardStats=(employeeId)=>{
    return new Promise((resolve,reject)=>{
        db.get(
            `SELECT
                COUNT(*) AS totalLeaves,
                SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS pendingLeaves,
                SUM(CASE WHEN status = 'Approved' THEN 1 ELSE 0 END) AS approvedLeaves,
                SUM(CASE WHEN status = 'Rejected' THEN 1 ELSE 0 END) AS rejectedLeaves
                FROM leave_requests
                WHERE employee_id = ?;`,
    [employeeId],
    (err,row)=>{
        if (err){
            return reject (err);
        }
        resolve(row);
    }

        )
    });
};

export default getDashboardStats;