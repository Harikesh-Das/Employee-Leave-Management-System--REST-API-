import { asyncHandler } from '../utils/asyncHandler.js';
import apiResponse from '../utils/apiResponse.js';
import { processImageUpload } from '../services/employee.service.js';

// Upload Image
const uploadEmployeeImage = asyncHandler(async (req, res) => {
  const result =  processImageUpload(req.file);
  return apiResponse.successHelp(res, 201, "Image uploaded successfully", result);
});

export { uploadEmployeeImage};
