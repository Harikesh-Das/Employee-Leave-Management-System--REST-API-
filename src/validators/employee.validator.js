import { body } from 'express-validator';




export const uploadEmployeeValidation = [
  body("employeeId")
    .isInt({ min: 1 })
    .withMessage("Valid employeeId is required"),
];



export function validateImage(req, res, next) {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Image is required",
    });
  }

  next();
}