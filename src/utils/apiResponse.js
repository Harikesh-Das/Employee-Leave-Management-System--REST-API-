function successHelp (res,statuscode=200,message='OK',data=null){
    return res.status(statuscode).json({
        success: true,
        message: message,
        data: data
    });
};

function errorHelp (res, statuscode=500, message="ERROR",errors=null){
    return res.status(statuscode).json({
        success:false,
        message: message,
        errors: errors
    })
}

export default {successHelp,errorHelp};
