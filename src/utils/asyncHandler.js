// Wrapper to handle async route handlers and forward errors to Express error middleware
// This helper ensures rejected promises are passed to Express error handling
export const asyncHandler= (fn)=>{
    return (req, res, next)=> Promise.resolve(fn(req,res,next)).catch(next);
}