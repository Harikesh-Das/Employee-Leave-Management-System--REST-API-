import {asyncHandler} from '../utils/asyncHandler.js';
import apiResponse from '../utils/apiResponse.js';
import {registerUser,loginUser} from '../services/auth.service.js';


// Registration Controller
const register= asyncHandler(async (req, res) => {
   
    const {user,token}= await registerUser(req.body);
    const secure_user={
        session_token:token,
        id:user.id,
        employee_id:user.employee_id,
        name: user.name,
        email:user.email,
        department: user.department,
        role:user.role,
        createdDate: user.created_at
    }
    const statusCode=201;
    const message="User Registered Successfully";
    return apiResponse.successHelp(res,statusCode,message,secure_user);
});

// Login Controller
const login= asyncHandler(async (req, res) => {
    const {user,token}= await loginUser(req.body);
    const secure_user={
        session_token:token,
        id:user.id,
        employee_id:user.employee_id,
        name: user.name,
        email:user.email,
        department: user.department,
        role:user.role,
        createdDate: user.created_at

    }
    const statusCode=200;
    const message="Logged in Successfully.";
    return apiResponse.successHelp(res, statusCode, message, secure_user);

});



export  {register,login};