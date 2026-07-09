import express from 'express';

import {
   updateEmployee,
   deleteEmployee,
   getEmployeebyId,
   getallEmployees
} from "../controller/employeecrud.controller.js"
import authenticate from "../middlewares/authenticate.js";
import authorize from "../middlewares/authorize.js";


const router = express.Router();

router.use(authenticate);


router.get("/allemployees", authorize("admin") ,getallEmployees);
router.get("/employeedetails/:employeeId", getEmployeebyId);
router.patch("/update/:employeeId", updateEmployee);
router.delete("/delete/:employeeId", deleteEmployee);

export default router;