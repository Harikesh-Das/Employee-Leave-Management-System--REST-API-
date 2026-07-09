import { asyncHandler } from "../utils/asyncHandler.js";

const authorize = (...allowedRoles) => {
    return asyncHandler(async (req, res, next) => {
        // req.user is set by the authenticate middleware
        
        if (!req.user || !req.user.role) {
            res.status(403);
            throw new Error("Forbidden: User information is missing");
        }

        if (!allowedRoles.includes(req.user.role)) {
            res.status(403);
            throw new Error("Access denied: You do not have permission to perform this action");
        }
        
        next();
    });
};

export default authorize;
