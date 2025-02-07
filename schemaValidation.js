import joi from "joi";
export const listingSchemaJoi=function(req,res,next){
    const schema=joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        location:joi.string().required(),
        country:joi.string().required(),
        price:joi.number().required().min(0),
        image:joi.string().allow("",null)
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.send(400).json({message:"bad request",error});
    }
    next();
};
export const reviewSchemaJoi = function (req,res,next){
    const schema = joi.object({
        title: joi.string().required(),
        body: joi.string().required(),
        rating: joi.number().min(1).max(5).required()
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.send(400).json({message:"bad request",error});
    }
    next();
}
export const userSchemaJoi = function (req,res,next){
    const schema = joi.object({
        // Define your schema here
        email: joi.string().required(),
        username: joi.string().required(),
        password: joi.string().required()
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.send(400).json({message:"bad request",error});
    }
    next();
}
export const signupValidation=function(req,res,next){
    const schema=joi.object({
        email:joi.string().required().email(),
        username:joi.string().required().min(3).max(40),
        password:joi.string().required().min(8).max(25)
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.send(400).json({message:"bad request",error});
    }
    return next();
}
export const loginValidation=function(req,res,next){
    const schema=joi.object({
        email:joi.string().required().email(),
        username:joi.string().required().min(3).max(40),
        password:joi.string().required().min(8).max(25)
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.send(400).json({message:"bad request",error});
    }
    next();
}