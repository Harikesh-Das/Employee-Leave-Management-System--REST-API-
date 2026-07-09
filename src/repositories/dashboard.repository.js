import db from '../config/db.js';

const getDashboardStats=(employeeID)=>{
    return new Promise((resolve,reject)=>{
        db.get(
            `SELECT
    COUNT(*) AS totalLeaves,
    COUNT(CASE WHEN status = 'Pending' THEN 1 END) AS pendingLeaves,
    COUNT(CASE WHEN status = 'Approved' THEN 1 END) AS approvedLeaves,
    COUNT(CASE WHEN status = 'Rejected' THEN 1 END) AS rejectedLeaves
    FROM leave_requests
    WHERE employee_id = ?;`,
    [employeeID],
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