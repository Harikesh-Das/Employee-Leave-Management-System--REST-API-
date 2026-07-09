import { findEmployeeById, updateEmployeeImageRecord } from "../repositories/employee.repository.js";

const processImageUpload = async (file) => {
  return {
    filename: file.filename,
    employeeName: file.employeeName,
    path: `/images/${file.filename}`,
  };
};

const processImageUpdate = async (employeeId, file) => {
  if (!employeeId) {
    const error = new Error("Valid employeeId is required");
    error.statusCode = 400;
    throw error;
  }

  const employee = await findEmployeeById(employeeId);
  if (!employee) {
    const error = new Error("Employee not found");
    error.statusCode = 404;
    throw error;
  }

  const imagePath = `/images/${file.filename}`;
  await updateEmployeeImageRecord(employeeId, imagePath);

  return {
    employeeId,
    employeeName: file.employeeName,
    image: imagePath,
  };
};

export { processImageUpload, processImageUpdate };
