import express from "express";
import { uploadEmployeeImage } from "../controller/employee.controller.js";
import { upload, renameEmployeeImage } from "../middlewares/multer.employeeimage.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

// Require authentication to upload images
router.post("/upload", authenticate, upload.single("file"), renameEmployeeImage, uploadEmployeeImage);

export default router;