import apiResponse from "../utils/apiResponse.js";

// Middleware to handle undefined routes and return a 404 response
export const notFound = (req, res) => {
    return apiResponse.errorHelp(res, 404, 'Route not found');
};

export default notFound;
