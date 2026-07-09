import  {asyncHandler}  from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import fetchDashboardStats from "../services/dash.services.js";


// Leaves Statistics
const leavesDashboard= asyncHandler(async (req,res) => {
    const employeeId= Number(req.user.id);
    const result= await fetchDashboardStats(employeeId);
    const statusCode=200
    const message="Leave stats fetched successfully"
    return apiResponse.successHelp(res,statusCode,message,result);
});

export default leavesDashboard;