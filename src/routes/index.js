import { Router } from "express";
import authRoutes from "./auth.routes.js";
import leaveRoutes from "./leave.routes.js";
import dashRoutes from "./dash.routes.js";
import imgRoutes from "./employee.route.js";

const router=Router();

// Mount authentication routes under /auth
router.use('/auth',authRoutes);

//Mount leaves routes under /leave
router.use('/leave',leaveRoutes);

//Mount image upload routes under /img
router.use('/img',imgRoutes);

// router.use('/crud',crudRoutes);


// Mount dashboard routes under /dash
router.use('/dash',dashRoutes);



export default router;