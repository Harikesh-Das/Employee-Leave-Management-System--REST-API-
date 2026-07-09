import {
  getLeavesCountByStatus,
  getTotalEmployeesCount,
  getTotalLeaveDaysRequested,
  getTotalLeavesCount,
} from "../repositories/dashboard.repository.js";

const getDashboardSummary = async () => {
  const [
    totalEmployees,
    totalLeaves,
    totalLeaveDaysRequested,
    pendingLeaves,
    approvedLeaves,
    rejectedLeaves,
  ] = await Promise.all([
    getTotalEmployeesCount(),
    getTotalLeavesCount(),
    getTotalLeaveDaysRequested(),
    getLeavesCountByStatus("Pending"),
    getLeavesCountByStatus("Approved"),
    getLeavesCountByStatus("Rejected"),
  ]);

  return {
    totalEmployees,
    totalLeaves,
    totalLeaveDaysRequested,
    pendingLeaves,
    approvedLeaves,
    rejectedLeaves,
  };
};

const gettotalEmployees = async () => {
  const totalEmployees = await getTotalEmployeesCount();
  return { totalEmployees };
};

const gettotalLeaves = async () => {
  const totalLeaves = await getTotalLeavesCount();
  return { totalLeaves };
};

const getpendingLeaves = async () => {
  const pendingLeaves = await getLeavesCountByStatus("Pending");
  return { pendingLeaves };
};

const gettotalLeaveDaysRequested = async () => {
  const totalLeaveDaysRequested = await getTotalLeaveDaysRequested();
  return { totalLeaveDaysRequested };
};

const getapprovedLeaves = async () => {
  const approvedLeaves = await getLeavesCountByStatus("Approved");
  return { approvedLeaves };
};

const getrejectedLeaves = async () => {
  const rejectedLeaves = await getLeavesCountByStatus("Rejected");
  return { rejectedLeaves };
};

export {
  getDashboardSummary,
  gettotalEmployees,
  gettotalLeaves,
  gettotalLeaveDaysRequested,
  getpendingLeaves,
  getapprovedLeaves,
  getrejectedLeaves,
};
