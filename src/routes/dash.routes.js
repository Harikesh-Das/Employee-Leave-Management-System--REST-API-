import { Router } from 'express';
import validateRequest from "../middlewares/validateRequest.js";
import authenticate from '../middlewares/authenticate.js';
import apiResponse from '../utils/apiResponse.js';
import leavesDashValidator from '../validators/dash.validator.js';
import leavesDashboard from '../controller/dash.controller.js';

const dashRoutes=Router();

// To get leaves statistics
dashRoutes.get('/leaves',authenticate,leavesDashValidator,validateRequest,leavesDashboard);

export default dashRoutes;