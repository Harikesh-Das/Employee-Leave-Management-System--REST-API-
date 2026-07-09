import db from "../config/db.js";

const getSingleCount = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) return reject(err);
      resolve(Number(row?.count ?? 0));
    });
  });
};

const getTotalEmployeesCount = () => {
  return getSingleCount(`SELECT COUNT(*) AS count FROM users`);
};

const getTotalLeavesCount = () => {
  return getSingleCount(`SELECT COUNT(*) AS count FROM leave_requests`);
};

const getLeavesCountByStatus = (status) => {
  return getSingleCount(
    `SELECT COUNT(*) AS count FROM leave_requests WHERE status = ?`,
    [status]
  );
};

const getTotalLeaveDaysRequested = () => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT COALESCE(SUM(total_days), 0) AS total_days_requested FROM leave_requests`,
      [],
      (err, row) => {
        if (err) return reject(err);
        resolve(Number(row?.total_days_requested ?? 0));
      }
    );
  });
};

export {
  getTotalEmployeesCount,
  getTotalLeavesCount,
  getLeavesCountByStatus,
  getTotalLeaveDaysRequested,
};
