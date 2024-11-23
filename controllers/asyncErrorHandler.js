import globalErrorHandler from "./globalErrorHandler.js";
export default function(func){
    return function(req,res,next){
        func(req,res,next).catch(next);//.catch will call global error handleer function b/c func will return a promise
    }
}