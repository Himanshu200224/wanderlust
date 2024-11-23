class CustomExpressError extends Error{
    constructor(statusCode,message){
        super(message);
        this.statusCode=statusCode;
        this.status=statusCode>=400 && statusCode<500?'fail':'error';
    }
}
export default CustomExpressError;