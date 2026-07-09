import {
  changeemployee, removeemployee, getemployees, getemployeeById
} from "../repositories/employeecrud.repositories.js";

const updateemployee = async ({ employeeId, name, email, department, role }) => {
   if(!employeeId){
      const error = new Error("employeeId is required to update details");
      error.statusCode = 400;
      throw error;
   }
   const employee = await getemployeeById(employeeId);
   if(!employee) {
      const error = new Error("employee not found");
      error.statusCode = 404;
      throw error;
   }
   
   await changeemployee(employeeId, name || employee.name, email || employee.email, department || employee.department, role || employee.role);
   return await getemployeeById(employeeId);
}

const deleteemployee = async (employeeId) => {
   if(!employeeId){
      const error = new Error("employeeId is required to delete");
      error.statusCode = 400;
      throw error;
   }
   const employee = await getemployeeById(employeeId);
   if(!employee) {
      const error = new Error("employee not found");
      error.statusCode = 404;
      throw error;
   }
   await removeemployee(employeeId);
   return { message: "Employee deleted successfully" };
}

const getemployeebyId = async (employeeId) => {
   if(!employeeId){
      const error = new Error("employeeId is required");
      error.statusCode = 400;
      throw error;
   }
   const employee = await getemployeeById(employeeId);
   if(!employee) {
      const error = new Error("employee not found");
      error.statusCode = 404;
      throw error;
   }
   return employee;
}

const getallemployees = async (filters) => {
   return await getemployees(filters);
}

export {
   updateemployee,
   deleteemployee,
   getemployeebyId,
   getallemployees
};