import express from "express";
import { uploadEmployeeImage } from "../controller/employee.controller.js";
import { upload, renameEmployeeImage } from "../middlewares/multer.employeeimage.js";
import authenticate from "../middlewares/authenticate.js";
import { validateImage, uploadEmployeeValidation } from "../validators/employee.validator.js";
import validateRequest from "../middlewares/validateRequest.js";

const router = express.Router();

// Require authentication to upload images
router.post("/upload", authenticate, upload.single("file"), uploadEmployeeValidation, validateRequest, validateImage, renameEmployeeImage, uploadEmployeeImage);

export default router;