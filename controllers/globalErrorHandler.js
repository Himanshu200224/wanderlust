export default function globalErrorHandler(err,req,res,next){
    err.statusCode=err.statusCode||500;
    err.status=err.status||'some error occurred';
    res.status(err.statusCode).json({
        status:err.statusCode,
        message:err.message
    })
}