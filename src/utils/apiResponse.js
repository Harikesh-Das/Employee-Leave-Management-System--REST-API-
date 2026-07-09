// Send a standardized successful API response
function successHelp (res,statusCode=200,message='OK',data=null){
    return res.status(statusCode).json({
        success: true,
        message: message,
        data: data
    });
};

// Send a standardized error API response
function errorHelp (res, statusCode=500, message="ERROR",errors=null){
    return res.status(statusCode).json({
        success:false,
        message: message,
        errors: errors
    })
}

export default {successHelp,errorHelp};
