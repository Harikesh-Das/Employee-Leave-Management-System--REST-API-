import multer from "multer";
import fs from "fs";
import path from "path";
import { findEmployeeById } from "../repositories/employee.repository.js";
import apiResponse from "../utils/apiResponse.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = "public/images";
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const employeeId = req.body.employeeId || req.params.employeeId;
    const ext = path.extname(file.originalname);
    const filename = employeeId ? `temp_${employeeId}${ext}` : `temp_${Date.now()}${ext}`;
    cb(null, filename);
  }
});

const allowedMimeTypes = ["image/jpg", "image/jpeg", "image/png"];

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} is not allowed. Allowed types: ${allowedMimeTypes.join(", ")}`), false);
    }
  }
});

const renameEmployeeImage = async (req, res, next) => {
  try {
    const employeeId = Number(req.body.employeeId || req.params.employeeId);

    if (!req.file || !employeeId) {
      if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return apiResponse.errorHelp(res, 400, "employeeId and file are required");
    }

    const employee = await findEmployeeById(employeeId);

    if (!employee) {
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return apiResponse.errorHelp(res, 404, "Employee not found");
    }

    const ext = path.extname(req.file.originalname);
    const newFilename = `${employee.name.replace(/\s+/g, "_")}${ext}`;
    const newPath = path.join("public/images", newFilename);

    if (fs.existsSync(req.file.path)) {
      fs.renameSync(req.file.path, newPath);
    }

    req.file.filename = newFilename;
    req.file.employeeName = employee.name;

    next();
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

export { upload, renameEmployeeImage };
