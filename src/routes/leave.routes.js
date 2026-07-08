import express from "express";
import {
  applyLeave,
  cancelLeave,
  getLeaveHistory,
  approveLeave,
  rejectLeave,
} from "../controller/leave.controller.js";

const router = express.Router();

router.post("/apply", applyLeave);
router.patch("/:leaveId/cancel", cancelLeave);
router.get("/history/:employeeId", getLeaveHistory);
router.patch("/:leaveId/approve", approveLeave);
router.patch("/:leaveId/reject", rejectLeave);

export default router;
