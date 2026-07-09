import express from "express";

import {
  applyLeave,
  cancelLeave,
  getLeaveHistory,
  approveLeave,
  rejectLeave,
} from "../controller/leave.controller.js";
import validateRequest from "../middlewares/validateRequest.js";
import {
  applyLeaveValidator,
  cancelLeaveValidator,
  leaveHistoryValidator,
  reviewLeaveValidator
} from "../validators/leave.validator.js";

const leaveRoutes = express.Router();

leaveRoutes.post("/apply", applyLeaveValidator, validateRequest, applyLeave);
leaveRoutes.patch("/:leaveId/cancel", cancelLeaveValidator, validateRequest, cancelLeave);
leaveRoutes.get("/history/:employeeId", leaveHistoryValidator, validateRequest, getLeaveHistory);
leaveRoutes.patch("/:leaveId/approve", reviewLeaveValidator, validateRequest, approveLeave);
leaveRoutes.patch("/:leaveId/reject", reviewLeaveValidator, validateRequest, rejectLeave);

export default leaveRoutes;
