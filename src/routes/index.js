import { Router } from "express";
import authRoutes from "./auth.routes.js";
import leaveRoutes from "./leave.routes.js";

const router=Router();

// Mount authentication routes under /auth
router.use('/auth',authRoutes);

// Mount leave routes under /leave
router.use('/leave', leaveRoutes);

export default router;