import { asyncHandler } from '../utils/asyncHandler.js';
import apiResponse from '../utils/apiResponse.js';
import {
  applyForLeave,
  cancelEmployeeLeave,
  fetchLeaveHistory,
  processLeaveReview
} from '../services/leave.service.js';

const applyLeave = asyncHandler(async (req, res) => {
  const result = await applyForLeave({
    employeeId: req.user.id,
    leaveType: req.body.leaveType,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    reason: req.body.reason,
  });

  return apiResponse.successHelp(res,201,"Leave applied successfully",result);
});

const cancelLeave = asyncHandler(async (req, res) => {
  const leaveId = Number(req.params.leaveId);
  const employeeId = (req.user.id);
  const result = await cancelEmployeeLeave(leaveId, employeeId);
  return apiResponse.successHelp(res, 200, "Leave cancelled successfully", result);
});

const getLeaveHistory = asyncHandler(async (req, res) => {
  const employeeId = Number(req.user.id);
  const result = await fetchLeaveHistory(employeeId);
  return apiResponse.successHelp(res, 200, "Leave history fetched successfully", result);
});

const approveLeave = asyncHandler(async (req, res) => {
  const leaveId = Number(req.params.leaveId);
  const managerId = Number(req.user.id);
  const managerComment = req.body.managerComment || null;
  
  const result = await processLeaveReview(leaveId, managerId, managerComment, "Approved");
  return apiResponse.successHelp(res, 200, "Leave approved successfully", result);
});

const rejectLeave = asyncHandler(async (req, res) => {
  const leaveId = Number(req.params.leaveId);
  const managerId = Number(req.user.id);
  const managerComment = req.body.managerComment || null;

  const result = await processLeaveReview(leaveId, managerId, managerComment, "Rejected");
  return apiResponse.successHelp(res, 200, "Leave rejected successfully", result);
});

export {
  applyLeave,
  cancelLeave,
  getLeaveHistory,
  approveLeave,
  rejectLeave
};
