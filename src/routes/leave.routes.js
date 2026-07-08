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

const router = express.Router();

router.post("/apply", applyleave, validateRequest, applyLeave);
router.patch("/:leaveId/cancel", cancelLeaveValidator, validateRequest, cancelLeave);
router.get("/history/:employeeId", leaveHistoryValidator, validateRequest, getLeaveHistory);
router.patch("/:leaveId/approve", reviewLeaveValidator, validateRequest, approveLeave);
router.patch("/:leaveId/reject", reviewLeaveValidator, validateRequest, rejectLeave);

export default router;
