import jwt from 'jsonwebtoken';
import "dotenv/config";
import express from 'express';
import session  from 'express-session';
const sessionOptions = {
    secret: "mysupersecretcode", resave: false, saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};
const app=express();
app.use(session(sessionOptions));
export const verifyTokenMiddleware = (req, res, next) => { 
    if (!token){
        //if token is not present then
        req.flash('failure','you are not logged in please login first');
        return res.redirect('/user/login');
    }
    try { 
        const decoded = jwt.verify(token,  
            process.env.JWT_SECRET_KEY); 
        req.user = decoded;
        req.flash('success','you are authorized');
        res.redirect('/listings');
        next();
    } catch (err) { 
        req.flash('failure','you are not authorized login first');
        return res.redirect('/user/login');
    }
    }
    verifyTokenMiddleware();