import { body, param, checkExact } from "express-validator";

const applyLeaveValidator = [
   checkExact([
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
   ])
];

const cancelLeaveValidator = [
   checkExact([

      param("leaveId")
         .notEmpty()
         .withMessage("leaveId param is required")
         .isNumeric()
         .withMessage("leaveId must be numeric"),
     
   ])
];

const leaveHistoryValidator = [
 
];

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