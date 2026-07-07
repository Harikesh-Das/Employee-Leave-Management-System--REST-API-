function successHelp (res,statusCode=200,message='OK',data=null){
    return res.status(statusCode).json({
        success: true,
        message: message,
        data: data
    });
};

function errorHelp (res, statusCode=500, message="ERROR",errors=null){
    return res.status(statusCode).json({
        success:false,
        message: message,
        errors: errors
    })
}

export default {successHelp,errorHelp};
