import express from "express";
import { uploadEmployeeImage } from "../controller/employee.controller.js";
import { upload, renameEmployeeImage } from "../middlewares/multer.employeeimage.js";
import authenticate from "../middlewares/authenticate.js";
import { validateImage} from "../validators/employee.validator.js";

const imgRoutes = express.Router();

// Require authentication to upload images
imgRoutes.post("/upload", authenticate, upload.single("file"), validateImage, renameEmployeeImage, uploadEmployeeImage);

export default imgRoutes;