import { asyncHandler } from '../utils/asyncHandler.js';
import apiResponse from '../utils/apiResponse.js';

import {
     updateemployee,
     deleteemployee,
     getemployeebyId,
     getallemployees
} from "../services/employeecrud.service.js";

const updateEmployee = asyncHandler(async(req, res) => {
   const { employeeId } = req.params;
   const result = await updateemployee({ employeeId, ...req.body });
   return apiResponse.successHelp(res, 200, "Employee details updated successfully", result);
});

const deleteEmployee = asyncHandler(async(req, res) => {
   const { employeeId } = req.params;
   const result = await deleteemployee(employeeId);
   return apiResponse.successHelp(res, 200, "Employee deleted successfully", result);
});

const getEmployeebyId = asyncHandler(async(req, res) => {
   const { employeeId } = req.params;
   const result = await getemployeebyId(employeeId);
   return apiResponse.successHelp(res, 200, "Fetched employee details by id", result);
});

const getallEmployees = asyncHandler(async(req, res) => {
   const { department, role } = req.query;
   const filters = { department, role };
   
   const result = await getallemployees(filters);
   return apiResponse.successHelp(res, 200, "Fetched all employees", result);
});

export {
   updateEmployee,
   deleteEmployee,
   getEmployeebyId,
   getallEmployees
};
