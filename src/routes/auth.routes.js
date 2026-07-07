import { Router } from 'express';
import {register,login } from '../controller/auth.controller.js';
import {registerValidator, loginValidator} from '../validators/auth.validators.js';
import validateRequest from "../middlewares/validateRequest.js";
import authenticate from '../middlewares/authenticate.js';
import apiResponse from '../utils/apiResponse.js';

const authRoutes=Router();

authRoutes.post("/register",registerValidator,validateRequest,register);
authRoutes.post ("/login",loginValidator,validateRequest,login);
authRoutes.get("/me",authenticate,(req,res)=>{
    apiResponse.successHelp(res,200,"User fetched successfully ",req.user)
});



export default authRoutes;




