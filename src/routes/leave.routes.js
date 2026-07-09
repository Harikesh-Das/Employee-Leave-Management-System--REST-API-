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
  applyleave,
  cancelLeaveValidator,
  leaveHistoryValidator,
  reviewLeaveValidator
} from "../validators/leave.validator.js";
import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

// All leave routes require authentication
router.use(authenticate);

router.post("/apply", applyleave, validateRequest, applyLeave);
router.patch("/:leaveId/cancel", cancelLeaveValidator, validateRequest, cancelLeave);
router.get("/history/:employeeId", leaveHistoryValidator, validateRequest, getLeaveHistory);

// Only admins can approve or reject leaves
router.patch("/:leaveId/approve", authorize('admin'), reviewLeaveValidator, validateRequest, approveLeave);
router.patch("/:leaveId/reject", authorize('admin'), reviewLeaveValidator, validateRequest, rejectLeave);

export default router;
