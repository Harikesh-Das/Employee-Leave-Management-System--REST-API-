import { validationResult } from "express-validator";
import apiResponse from "../utils/apiResponse.js";

// Middleware to validate request inputs and return errors if validation fails
const validateRequest = (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return apiResponse.errorHelp(
            res,
            400,
            "Validation failed",
            result.array()
        );
    }

    next();
};

export default validateRequest;