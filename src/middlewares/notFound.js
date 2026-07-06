import apiResponse from "../utils/apiResponse.js";

export const notFound= (req,res)=>{
    return apiResponse.errorHelp(res,404, "Route not Found");

};
