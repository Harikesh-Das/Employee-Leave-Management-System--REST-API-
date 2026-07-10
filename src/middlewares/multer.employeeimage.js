import multer from "multer";
import fs from "fs";
import path from "path";

import apiResponse from "../utils/apiResponse.js";

const storage = multer.diskStorage({
  // Destination function to ensure the uploads folder exists and set the upload path
  destination: function (req, file, cb) {
    const folder = "uploads";
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    cb(null, folder);
  },
  // Filename function to create a temporary file name based on the authenticated user
  filename: function (req, file, cb) {
    const employeeId = req.user.id;
    const ext = path.extname(file.originalname);
    const filename = employeeId ? `temp_${employeeId}${ext}` : `temp_${Date.now()}${ext}`;
    cb(null, filename);
  }
});

const allowedMimeTypes = ["image/jpg", "image/jpeg", "image/png"];
const allowedExtensions = [".jpg", ".jpeg", ".png"];

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },

  // File filter function to validate allowed image MIME types and extensions
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    const validMime = allowedMimeTypes.includes(file.mimetype);
    const validExtension = allowedExtensions.includes(ext);

    console.log("Original Name:", file.originalname);
    console.log("Mime Type:", file.mimetype);
    console.log("Extension:", ext);

    if (validMime || validExtension) {
      return cb(null, true);
    }

    cb(
      new Error(
        `File type ${file.mimetype} (${ext}) is not allowed. Allowed types: JPG, JPEG, PNG.`
      ),
      false
    );
  },
});

// Middleware to rename the uploaded temporary employee image file to its final name
const renameEmployeeImage = async (req, res, next) => {
  try {
    const employeeId = req.user.id;

    if (!req.file || !employeeId) {
      if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return apiResponse.errorHelp(res, 400, " file is required");
    }



 const ext = path.extname(req.file.originalname);
const newFilename = `${req.user.employee_id}${ext}`;
const newPath = path.join("uploads", newFilename);

if (fs.existsSync(req.file.path)) {
  fs.renameSync(req.file.path, newPath);
}

req.file.filename = newFilename;
    

    next();
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

export { upload, renameEmployeeImage };
