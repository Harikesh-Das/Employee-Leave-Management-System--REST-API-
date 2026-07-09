import { Router } from "express";
import authRoutes from "./auth.routes.js";
import leaveRoutes from "./leave.routes.js";
import employeeRoutes from "./employee.route.js";
import dashboardRoutes from "./dashboard.routes.js";
import employeecrudRoutes from "./employeecrud.routes.js";

const router=Router();

// Mount authentication routes under /auth
router.use('/auth',authRoutes);

// Mount leave routes under /leave
router.use('/leave', leaveRoutes);

// Mount employee routes under /employee
router.use('/employee', employeeRoutes);
router.use('/dashboard', dashboardRoutes);

// Mount employee CRUD routes under /employees
router.use('/employees', employeecrudRoutes);

export default router;
