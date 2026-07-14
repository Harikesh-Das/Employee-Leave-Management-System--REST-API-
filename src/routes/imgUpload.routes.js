import express from "express";
import { uploadEmployeeImage } from "../controller/imgUpload.controller.js";
import { upload, renameEmployeeImage } from "../middlewares/multerImgUpload.js";
import authenticate from "../middlewares/authenticate.js";
import { validateImage} from "../validators/imgUpload.validator.js";

const imgRoutes = express.Router();

// Require authentication to upload images
imgRoutes.post("/upload", authenticate, upload.single("file"), validateImage, renameEmployeeImage, uploadEmployeeImage);

export default imgRoutes;