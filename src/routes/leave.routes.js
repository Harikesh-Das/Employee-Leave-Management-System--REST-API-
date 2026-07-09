import express from "express";
import authenticate from "../middlewares/authenticate.js";
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

// Apply for leave
leaveRoutes.post("/apply", authenticate,applyLeaveValidator, validateRequest, applyLeave);
// Cancel leave request
leaveRoutes.patch("/:leaveId/cancel", authenticate,cancelLeaveValidator, validateRequest, cancelLeave);
// Get leave history
leaveRoutes.get("/history", authenticate, leaveHistoryValidator, validateRequest, getLeaveHistory);
// Approve leave request
leaveRoutes.patch("/:leaveId/approve", authenticate, reviewLeaveValidator, validateRequest, approveLeave);
// Reject leave request
leaveRoutes.patch("/:leaveId/reject", authenticate, reviewLeaveValidator, validateRequest, rejectLeave);

export default leaveRoutes;
