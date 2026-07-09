import { resolve } from "dns";
import db from "../config/db.js";

const DEFAULT_BALANCES = {
  Casual: 12,
  Sick: 8,
  "Earned Leave": 18,
};

const checkduplication = (employeeId, startDate, endDate) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM leave_requests 
       WHERE employee_id = ? 
       AND status IN ('Pending', 'Approved') 
       AND start_date <= ? 
       AND end_date >= ?`,
       [employeeId, endDate, startDate], 
       (err, row) => {
          if (err) return reject(err);
          resolve(row);
       }
    );
  });
};

const findEmployeeById = (employeeId) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE id = ?", [employeeId], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

const insertLeaveBalance = (employeeId, leaveType, totalDays) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT OR IGNORE INTO leave_balances (employee_id, leave_type, total_days) VALUES (?, ?, ?)`,
      [employeeId, leaveType, totalDays],
      function (err) {
        if (err) return reject(err);
        resolve(this.changes);
      }
    );
  });
};

const getLeaveBalance = (employeeId, leaveType) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT total_days FROM leave_balances WHERE employee_id = ? AND leave_type = ?`,
      [employeeId, leaveType],
      (err, row) => {
        if (err) return reject(err);
        resolve(row);
      }
    );
  });
};

const getUsedLeaveDays = (employeeId, leaveType) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT COALESCE(SUM(total_days), 0) AS used_days FROM leave_requests
       WHERE employee_id = ? AND leave_type = ? AND status IN ('Pending', 'Approved')`,
      [employeeId, leaveType],
      (err, row) => {
        if (err) return reject(err);
        resolve(row);
      }
    );
  });
};

const insertLeaveRequest = (employeeId, leaveType, startDate, endDate, totalDays, reason) => {
  return new Promise((resolve, reject) => {
    checkduplication(employeeId, startDate, endDate)
      .then(existingLeave => {
        if (existingLeave) {
          const err = new Error("Duplicate leave: The requested dates overlap with an existing leave.");
          err.statusCode = 400;
          return reject(err);
        }
        
        db.run(
          `INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, total_days, reason)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [employeeId, leaveType, startDate, endDate, totalDays, reason],
          function (err) {
            if (err) return reject(err);
            resolve(this.lastID);
          }
        );
      })
      .catch(reject);
  });
};

const findLeaveById = (leaveId) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT lr.*, u.name AS employee_name, u.department, u.role
       FROM leave_requests lr
       JOIN users u ON u.id = lr.employee_id
       WHERE lr.id = ?`,
      [leaveId],
      (err, row) => {
        if (err) return reject(err);
        resolve(row);
      }
    );
  });
};

const updateLeaveStatus = (leaveId, status, managerId = null, managerComment = null) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE leave_requests
       SET status = ?, manager_id = ?, manager_comment = ?, action_at = CURRENT_TIMESTAMP
       ${status === 'Cancelled' ? ', cancelled_at = CURRENT_TIMESTAMP' : ''}
       WHERE id = ?`,
      [status, managerId, managerComment, leaveId],
      function (err) {
        if (err) return reject(err);
        resolve(this.changes);
      }
    );
  });
};

const findLeaveHistory = (employeeId) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT lr.*, manager.name AS manager_name
       FROM leave_requests lr
       LEFT JOIN users manager ON manager.id = lr.manager_id
       WHERE lr.employee_id = ?
       ORDER BY lr.applied_at DESC, lr.id DESC`,
      [employeeId],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
};

export {
  DEFAULT_BALANCES,
  findEmployeeById,
  insertLeaveBalance,
  getLeaveBalance,
  getUsedLeaveDays,
  insertLeaveRequest,
  findLeaveById,
  updateLeaveStatus,
  findLeaveHistory
};
