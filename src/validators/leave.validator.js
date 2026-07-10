import { body, param, checkExact } from "express-validator";

// Leave Application Validation Rules
const applyLeaveValidator = [
   checkExact([
   body("leaveType")
      .trim()
      .notEmpty()
      .withMessage("leave type is required")
      .isString()
      .withMessage("leave type must be string"),

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
   ])
];

// Cancelling Leave Validation Rules
const cancelLeaveValidator = [
   checkExact([

      param("leaveId")
         .notEmpty()
         .withMessage("leaveId param is required")
         .isNumeric()
         .withMessage("leaveId must be numeric"),
     
   ])
];

// Leave History Validation Rules
const leaveHistoryValidator = [
 
];

// Leave Review Validation Rules
const reviewLeaveValidator = [
   param("leaveId")
      .notEmpty()
      .withMessage("leaveId param is required")
      .isNumeric()
      .withMessage("leaveId must be numeric"),
   body("managerComment")
      .optional()
      .isString()
      .withMessage("managerComment must be a string")
];

export {
    applyLeaveValidator,
    cancelLeaveValidator,
    leaveHistoryValidator,
    reviewLeaveValidator
};