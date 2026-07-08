import { body, param, checkExact } from "express-validator";

const applyleave = [
   body("employeeId")
      .trim()
      .notEmpty()
      .withMessage("employeeId is required")
      .isNumeric()
      .withMessage("employeeId must be numeric"),

   body("leaveType")
      .trim()
      .notEmpty()
      .withMessage("leave type is required")
      .isString()
      .withMessage("leavetype must be string"),

   body("startDate")
      .trim()
      .notEmpty()
      .withMessage("startDate is required")
      .isDate()
      .withMessage("startDate must be a date"),

   body("endDate")
      .trim()
      .notEmpty()
      .withMessage("endDate is required")
      .isDate()
      .withMessage("endDate must be a date"),

   body("reason")
      .trim()
      .notEmpty()
      .withMessage("reason is required")
      .isString()
      .withMessage("reason must be string")
];

const cancelLeaveValidator = [
   param("leaveId")
      .notEmpty()
      .withMessage("leaveId param is required")
      .isNumeric()
      .withMessage("leaveId must be numeric"),
   body("employeeId")
      .notEmpty()
      .withMessage("employeeId is required")
      .isNumeric()
      .withMessage("employeeId must be numeric")
];

const leaveHistoryValidator = [
   param("employeeId")
      .notEmpty()
      .withMessage("employeeId param is required")
      .isNumeric()
      .withMessage("employeeId must be numeric")
];

const reviewLeaveValidator = [
   param("leaveId")
      .notEmpty()
      .withMessage("leaveId param is required")
      .isNumeric()
      .withMessage("leaveId must be numeric"),
   body("managerId")
      .notEmpty()
      .withMessage("managerId is required")
      .isNumeric()
      .withMessage("managerId must be numeric"),
   body("managerComment")
      .optional()
      .isString()
      .withMessage("managerComment must be a string")
];

export {
    applyleave,
    cancelLeaveValidator,
    leaveHistoryValidator,
    reviewLeaveValidator
};