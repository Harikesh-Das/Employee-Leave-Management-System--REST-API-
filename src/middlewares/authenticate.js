import { asyncHandler } from "../utils/asyncHandler.js";
import {verifyToken} from "../utils/jwt.js";
import { findUserById } from "../repositories/auth.repository.js";

// Middleware to authenticate requests using a Bearer token
const authenticate= asyncHandler(async (req,res,next) => {
    let token;
    if(req.headers.authorization?.startsWith('Bearer ')){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        res.status(401);
        throw new Error ("Not Authorized , Authentication required")
    }
    const decoded= await verifyToken(token);

    const user = await findUserById(decoded.id);

    if(!user){
        res.status(401);
        throw new Error("User not found")
    }

    delete user.password_hash;
    
    req.user = user;

    next();

});

export default authenticate;