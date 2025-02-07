import express from 'express';
import {User} from '../models/user.model.js';
import { userSchemaJoi } from '../schemaValidation.js';
const router = express.Router({mergeParams:true});
import { signupValidation} from '../schemaValidation.js';
import bcrypt from 'bcrypt';

//signup request to form
router.get('/',(req,res)=>{
    res.render('./users/signup');//signup form show on screen
});
//signup post method to store data in db
router.post('/',signupValidation,async(req,res)=>{
    try{
    let {username,password,email}=req.body;
    const result=User.findOne({email:email});
    if(result){
        req.flash("error","Email already exists");
        res.redirect('/signup');
    }
    const newUser=new User({email,username,password});
    newUser.password=await bcrypt.hash(password,10);
    newUser.save().then(()=>{
        req.flash("success","Welcome to wanderlust");
    }).catch((error)=>{
        req.flash("error",error.message);
    });
    const registeredUser=await User.register(newUser,password);
    console.log(registeredUser);
    req.flash("success","Welcome to wanderlust");
    res.redirect('/listings');
    }catch(error){
        console.log(error);
        req.flash("error",error.message);
        res.redirect('/signup');
    }
});

export default router;