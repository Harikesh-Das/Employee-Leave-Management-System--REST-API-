import { asyncHandler } from '../utils/asyncHandler.js';
import apiResponse from '../utils/apiResponse.js';

import {
   getDashboardSummary,
   gettotalEmployees,
   gettotalLeaves,
   gettotalLeaveDaysRequested,
   getpendingLeaves,
   getapprovedLeaves,
   getrejectedLeaves
} from '../services/dashboard.service.js';

const dashboardSummary = asyncHandler(async (req, res) => {
   const result = await getDashboardSummary();
   return apiResponse.successHelp(res, 200, "Fetched dashboard summary successfully", result);
});

const totalEmployees = asyncHandler( async(req, res) => {
   const result = await gettotalEmployees();
   return apiResponse.successHelp(res, 200, "Fetched total employees successfully", result);
});

const totalLeaves = asyncHandler(async(req, res) => {
   const result = await gettotalLeaves();
   return apiResponse.successHelp(res, 200, "Fetched total leaves successfully", result);
});

const totalLeaveDaysRequested = asyncHandler(async(req, res) => {
   const result = await gettotalLeaveDaysRequested();
   return apiResponse.successHelp(res, 200, "Fetched total leave days requested successfully", result);
});

const pendingLeaves = asyncHandler(async(req, res) => {
   const result = await getpendingLeaves();
   return apiResponse.successHelp(res, 200, "Fetched pending leaves successfully", result);
});

const approvedLeaves = asyncHandler(async(req, res) => {
   const result = await getapprovedLeaves();
   return apiResponse.successHelp(res, 200, "Fetched approved leaves successfully", result);
});

const rejectedLeaves = asyncHandler(async(req, res) => {
   const result = await getrejectedLeaves();
   return apiResponse.successHelp(res, 200, "Fetched rejected leaves successfully", result);
});

export {
   dashboardSummary,
   totalEmployees,
   totalLeaves,
   totalLeaveDaysRequested,
   pendingLeaves,
   approvedLeaves,
   rejectedLeaves
};
