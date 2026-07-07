import 'dotenv/config';
import apiResponse from "../utils/apiResponse.js";


const errorHandler = (err,req,res, next )=>{
    const statusCode= err.statusCode || 500;
    const message= err.message || "Internal Server Error";
    if(process.env.NODE_ENV !== 'production'){
        const errors={stack:err.stack};
        return apiResponse.errorHelp(res,statusCode,message,errors);
    }
    else{
        const errors=null;
        return apiResponse.errorHelp(res,statusCode,message,errors);
    }
}

export default errorHandler;


