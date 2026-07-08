import {asyncHandler} from '../utils/asyncHandler.js';
import apiResponse from '../utils/apiResponse.js';
import {registerUser,loginUser,refreshUserToken,logoutUser} from '../services/auth.service.js';


// Registration Controller
const register= asyncHandler(async (req, res) => {
   
    const {user}= await registerUser(req.body);
    const secure_user={
        "user":{
            id:user.id,
            employee_id:user.employee_id,
            name: user.name,
            email:user.email,
            department: user.department,
            role:user.role,
            createdDate: user.created_at
        },
       
    }
    const statusCode=201;
    const message="User Registered Successfully";
    return apiResponse.successHelp(res,statusCode,message,secure_user);
});

// Login Controller
const login= asyncHandler(async (req, res) => {
    const {user,accessToken,refreshToken}= await loginUser(req.body);
    const secure_user={
        "user":{
        id:user.id,
        employee_id:user.employee_id,
        name: user.name,
        email:user.email,
        department: user.department,
        role:user.role,
        createdDate: user.created_at
        },
        access_token:accessToken,
        refresh_token:refreshToken

    }
    const statusCode=200;
    const message="Logged in Successfully.";
    return apiResponse.successHelp(res, statusCode, message, secure_user);

});

//Refresh token controller
const refresh = asyncHandler(async (req, res) => {
    const { refresh_token } = req.body;

    const { accessToken } = await refreshUserToken(refresh_token);

    const responseData = {
        access_token: accessToken
    };

    const statusCode = 200;
    const message = "Access Token Refreshed Successfully";

    return apiResponse.successHelp(res,statusCode,message,responseData);
});

//Logout Controller
const logout = asyncHandler(async (req, res) => {
    const { refresh_token } = req.body;

    const { message } = await logoutUser(refresh_token);

    const statusCode = 200;

    return apiResponse.successHelp(res,statusCode,message);
});



export  {register,login,refresh,logout};