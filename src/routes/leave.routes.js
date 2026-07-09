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

leaveRoutes.post("/apply", authenticate,applyLeaveValidator, validateRequest, applyLeave);
leaveRoutes.patch("/:leaveId/cancel", authenticate,cancelLeaveValidator, validateRequest, cancelLeave);
leaveRoutes.get("/history", authenticate, leaveHistoryValidator, validateRequest, getLeaveHistory);
leaveRoutes.patch("/:leaveId/approve", authenticate, reviewLeaveValidator, validateRequest, approveLeave);
leaveRoutes.patch("/:leaveId/reject", authenticate, reviewLeaveValidator, validateRequest, rejectLeave);

export default leaveRoutes;
