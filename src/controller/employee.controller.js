import { asyncHandler } from '../utils/asyncHandler.js';
import apiResponse from '../utils/apiResponse.js';
import { processImageUpload, processImageUpdate } from '../services/employee.service.js';

const uploadEmployeeImage = asyncHandler(async (req, res) => {
  const result = await processImageUpload(req.file);
  return apiResponse.successHelp(res, 200, "Image uploaded successfully", result);
});

const updateEmployeeImage = asyncHandler(async (req, res) => {
  const employeeId = Number(req.params.employeeId);
  const result = await processImageUpdate(employeeId, req.file);
  return apiResponse.successHelp(res, 200, "Image updated successfully", result);
});

export { uploadEmployeeImage, updateEmployeeImage };
