import db from "../config/db.js";

const manageEmployee = (query, params = []) => {
   return new Promise((resolve, reject) => {
      db.run(query, params, function(err) {
         if (err) return reject(err);
         resolve({ changes: this.changes });
      });
   })
}

const changeemployee = (employeeId, name, email, department, role) => {
   return manageEmployee(
     'UPDATE users SET name = ?, email = ?, department = ?, role = ? WHERE id = ?', 
     [name, email, department, role, employeeId]
   );
}

const removeemployee = (employeeId) => {
   return manageEmployee('DELETE FROM users WHERE id = ?', [employeeId]);
}

const getemployeeById = (employeeId) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT id, employee_id, name, email, department, role, created_at FROM users WHERE id = ?", [employeeId], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

const getemployees = (filters) => {
   return new Promise((resolve, reject) => {
      let query = 'SELECT id, employee_id, name, email, department, role, created_at FROM users WHERE 1=1';
      let params = [];

      if (filters.department) {
         query += ' AND department = ?';
         params.push(filters.department);
      }
      if (filters.role) {
         query += ' AND role = ?';
         params.push(filters.role);
      }

      db.all(query, params, (err, rows) => {
         if (err) return reject(err);
         resolve(rows);
      })
   })
}

export {
  changeemployee, removeemployee, getemployees, getemployeeById
};