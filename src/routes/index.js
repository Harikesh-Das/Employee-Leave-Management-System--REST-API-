import { Router } from "express";
import authRoutes from "./auth.routes.js";
import leaveRoutes from "./leave.routes.js";
import dashRoutes from "./dash.routes.js";

const router=Router();

// Mount authentication routes under /auth
router.use('/auth',authRoutes);

//Mount leaves routes under /leave
router.use('/leave',leaveRoutes);

// Mount dashboard routes under /dash
router.use('/dash',dashRoutes);

// router.use('/crud',crudRoutes);


export default router;