import { Router } from "express";
import {
  dashboardSummary,
  totalEmployees,
  totalLeaves,
  totalLeaveDaysRequested,
  pendingLeaves,
  approvedLeaves,
  rejectedLeaves,
} from "../controller/dashboard.controller.js";
import authenticate from '../middlewares/authenticate.js';
import authorize from '../middlewares/authorize.js';

const router = Router();

router.use(authenticate);

router.get("/", authorize('admin'), dashboardSummary);
router.get("/total-employees",authorize('admin'), totalEmployees);
router.get("/total-leaves",authorize('admin'), totalLeaves);
router.get("/total-leave-days-requested",authorize('admin'), totalLeaveDaysRequested);
router.get("/pending-leaves",authorize('admin'), pendingLeaves);
router.get("/approved-leaves",authorize('admin'), approvedLeaves);
router.get("/rejected-leaves",authorize('admin'), rejectedLeaves);

export default router;
