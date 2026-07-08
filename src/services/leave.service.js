import {
  DEFAULT_BALANCES,
  findEmployeeById,
  insertLeaveBalance,
  getLeaveBalance,
  getUsedLeaveDays,
  insertLeaveRequest,
  findLeaveById,
  updateLeaveStatus,
  findLeaveHistory
} from "../repositories/leave.repository.js";

const LEAVE_TYPES = ["Casual", "Sick", "Earned Leave"];

function isValidDate(value) {
  return !Number.isNaN(new Date(value).getTime());
}

// 2025-12-3111:30:00:000
function normalizeDate(value) {
  return new Date(value).toISOString().slice(0, 10);
}

function getInclusiveDayCount(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const milliseconds = end.getTime() - start.getTime();
  return Math.floor(milliseconds / (1000 * 60 * 60 * 24)) + 1;
}

const ensureEmployeeExists = async (employeeId) => {
  const employee = await findEmployeeById(employeeId);
  if (!employee) {
    const error = new Error("Employee not found");
    error.statusCode = 404;
    throw error;
  }
  return employee;
};

const getBalanceSummary = async (employeeId, leaveType) => {
  for (const [type, totalDays] of Object.entries(DEFAULT_BALANCES)) {
    await insertLeaveBalance(employeeId, type, totalDays);
  }

  const balance = await getLeaveBalance(employeeId, leaveType);
  const used = await getUsedLeaveDays(employeeId, leaveType);

  const total = balance ? balance.total_days : 0;
  const consumed = used ? used.used_days : 0;

  return {
    total,
    used: consumed,
    remaining: total - consumed,
  };
};

const applyForLeave = async ({ employeeId, leaveType, startDate, endDate, reason }) => {
  if (!employeeId || !leaveType || !startDate || !endDate) {
    const error = new Error("employeeId, leaveType, startDate and endDate are required");
    error.statusCode = 400;
    throw error;
  }

  if (!LEAVE_TYPES.includes(leaveType)) {
    const error = new Error(`leaveType must be one of: ${LEAVE_TYPES.join(", ")}`);
    error.statusCode = 400;
    throw error;
  }

  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    const error = new Error("startDate and endDate must be valid dates");
    error.statusCode = 400;
    throw error;
  }

  const normalizedStartDate = normalizeDate(startDate);
  const normalizedEndDate = normalizeDate(endDate);

  if (normalizedEndDate < normalizedStartDate) {
    const error = new Error("End Date cannot be before Start Date");
    error.statusCode = 400;
    throw error;
  }

  await ensureEmployeeExists(employeeId);

  const totalDays = getInclusiveDayCount(normalizedStartDate, normalizedEndDate);
  
  const balance = await getBalanceSummary(employeeId, leaveType);

  if (balance.remaining < totalDays) {
    const error = new Error("Insufficient leave balance");
    error.statusCode = 400;
    throw error;
  }

  const leaveId = await insertLeaveRequest(
    employeeId,
    leaveType,
    normalizedStartDate,
    normalizedEndDate,
    totalDays,
    reason || null
  );

  const data = await findLeaveById(leaveId);
  const updatedBalance = await getBalanceSummary(employeeId, leaveType);

  return { data, balance: updatedBalance };
};

const cancelEmployeeLeave = async (leaveId, employeeId) => {
  if (!leaveId || !employeeId) {
    const error = new Error("leaveId param and employeeId in body are required");
    error.statusCode = 400;
    throw error;
  }

  const leave = await findLeaveById(leaveId);
  if (!leave) {
    const error = new Error("Leave request not found");
    error.statusCode = 404;
    throw error;
  }

  if (leave.employee_id !== employeeId) {
    const error = new Error("You can only cancel your own leave request");
    error.statusCode = 403;
    throw error;
  }

  if (leave.status !== "Pending") {
    const error = new Error("Only pending leave requests can be cancelled");
    error.statusCode = 400;
    throw error;
  }

  await updateLeaveStatus(leaveId, "Cancelled");
  const updatedLeave = await findLeaveById(leaveId);

  return updatedLeave;
};

const fetchLeaveHistory = async (employeeId) => {
  if (!employeeId) {
    const error = new Error("Valid employeeId is required");
    error.statusCode = 400;
    throw error;
  }

  await ensureEmployeeExists(employeeId);
  const leaves = await findLeaveHistory(employeeId);

  const balances = await Promise.all(
    LEAVE_TYPES.map(async (leaveType) => ({
      leaveType,
      ...(await getBalanceSummary(employeeId, leaveType)),
    }))
  );

  return { leaves, balances };
};

const processLeaveReview = async (leaveId, managerId, managerComment, nextStatus) => {
  if (!leaveId || !managerId) {
    const error = new Error("leaveId param and managerId in body are required");
    error.statusCode = 400;
    throw error;
  }

  await ensureEmployeeExists(managerId);

  const leave = await findLeaveById(leaveId);
  if (!leave) {
    const error = new Error("Leave request not found");
    error.statusCode = 404;
    throw error;
  }

  if (leave.status !== "Pending") {
    const error = new Error(`Only pending leave requests can be ${nextStatus.toLowerCase()}`);
    error.statusCode = 400;
    throw error;
  }

  if (nextStatus === "Approved") {
    const balance = await getBalanceSummary(leave.employee_id, leave.leave_type);
    if (balance.remaining < leave.total_days) {
      const error = new Error("Insufficient leave balance at approval time");
      error.statusCode = 400;
      throw error;
    }
  }

  await updateLeaveStatus(leaveId, nextStatus, managerId, managerComment);
  const updatedLeave = await findLeaveById(leaveId);

  return updatedLeave;
};

export {
  applyForLeave,
  cancelEmployeeLeave,
  fetchLeaveHistory,
  processLeaveReview
};
