import { Router } from "express";
import authRoutes from "./auth.routes.js";
import leaveRoutes from "./leave.routes.js";

const router=Router();

// Mount authentication routes under /auth
router.use('/auth',authRoutes);
router.use('/leave',leaveRoutes);

// router.use('/crud',crudRoutes);
export default router;