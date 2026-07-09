import db from "../config/db.js";

const DEFAULT_BALANCES = {
  Casual: 12,
  Sick: 8,
  "Earned Leave": 18,
};

// Finds an employee record by ID.
const findEmployeeById = (employeeId) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE id = ?", [employeeId], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

// Inserts a leave balance record if it does not already exist.
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

// Retrieves the available leave balance for a given employee and leave type.
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

// Calculates used leave days for a specific employee and leave type.
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

// Inserts a new leave request record.
const insertLeaveRequest = (employeeId, leaveType, startDate, endDate, totalDays, reason) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, total_days, reason)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [employeeId, leaveType, startDate, endDate, totalDays, reason],
      function (err) {
        if (err) return reject(err);
        resolve(this.lastID);
      }
    );
  });
};

// Retrieves a leave request by ID, including employee details.
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

// Updates the status of a leave request and records manager action details.
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

// Retrieves leave history for a given employee.
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

// Checks for overlapping leave requests for the same employee.
const checkLeaveOverlap= (employeeId, newEndDate, newStartDate)=>{
  return new Promise((resolve, reject)=>{
    db.get(`
      SELECT *
      FROM leave_requests
      WHERE employee_id = ?
      AND status IN ('Pending', 'Approved')
      AND (
      start_date <= ?
      AND end_date >= ?
      )
      LIMIT 1;`,
    [employeeId,newEndDate,newStartDate],
    (err,row)=>{
      if (err) return reject(err);
      resolve (row);
    });
  });
};

// Checks for duplicate pending leave requests with the same period and type.
const checkDuplicateLeave= (leaveType,startDate,endDate)=>{
  return new Promise ((resolve,reject)=>{
    db.get(`
      SELECT id
      FROM leave_requests
      WHERE employee_id = ?
      AND leave_type = ?
      AND start_date = ?
      AND end_date = ?
      AND status = 'Pending'
      LIMIT 1;`,
    [leaveType,startDate,endDate],
  (err,row)=>{
    if(err) return reject(err);
    resolve (row);
    });  
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
  findLeaveHistory,
  checkLeaveOverlap,
  checkDuplicateLeave
};