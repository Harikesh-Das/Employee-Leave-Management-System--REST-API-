import { Router } from 'express';
import {register,login,refresh, logout } from '../controller/auth.controller.js';
import {registerValidator, loginValidator,refreshValidator, logoutValidator} from '../validators/auth.validators.js';
import validateRequest from "../middlewares/validateRequest.js";
import authenticate from '../middlewares/authenticate.js';
import apiResponse from '../utils/apiResponse.js';

const authRoutes=Router();

// Register a new user
authRoutes.post("/register",registerValidator,validateRequest,register);

// Login an existing user
authRoutes.post ("/login",loginValidator,validateRequest,login);

// Get current authenticated user
authRoutes.get("/me",authenticate,(req,res)=>{
    apiResponse.successHelp(res,200,"User fetched successfully ",req.user)
});

//Refresh access token
authRoutes.post("/refresh",refreshValidator,validateRequest,refresh);

//Logout (delete access token)
authRoutes.post("/logout",logoutValidator,validateRequest,logout);



export default authRoutes;




