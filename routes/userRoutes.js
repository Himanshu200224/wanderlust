import express from 'express';
import { User } from '../models/user.model.js';
import { userSchemaJoi } from '../schemaValidation.js';
const router = express.Router({ mergeParams: true });
import { signupValidation } from '../schemaValidation.js';
import bcrypt from 'bcrypt';
import flash from 'connect-flash';
import jwt from 'jsonwebtoken';
import session from 'express-session';
import "dotenv/config"; // Automatically loads environment variables
// import { verifyTokenMiddleware } from '../middlewares/verifyTOkenMiddleware.js';
//signup request to render form
const sessionOptions = {
    secret: "mysupersecretcode", resave: false, saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};
const app=express();
// app.use(verifyTokenMiddleware);
app.use(session(sessionOptions));
router.get('/signup', (req, res) => {
    res.render('./users/signup');//signup form show on screen
});
//signup post method to store data in db
router.post('/signup', async (req, res) => {
    try {
        const {username,password,email}=req.body.user;
        // Check if a user already exists in the database
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            req.flash('failure', 'User with this email already exists');
            return res.redirect('/user/signup');
        }
        //hashing to protect user data and password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // console.log(hashedPassword);
        // If user doesn't exist, create and save a new user
        const newUser = new User({ username, email, hashedPassword });
        await newUser.save()//saving user in user database
            .then(result => {
                req.flash('success',"new user created successfully welcome to wanderlust");
                return res.redirect('/listings');
            })
            .catch(error => {
                req.flash('failure', 'Error in creating new user');
                return res.redirect('/user/signup');
            });
    } catch (error) {
        console.error("Server error:", error);
        req.flash('failure', 'Error in creating new user');
        return res.redirect('/user/signup');
    }
});
//show login page route
router.get('/login', (req, res) => {
    return res.render('./users/login');
});
//login route
router.post('/login', async (req, res, next) => {
    if(req.session.loggedIn){
        req.flash('success','you are already logged in');
        return res.redirect('/listings');
    }
    //get user details from the login form
    const {username,email,password}=req.body;
    // now check whether user exists in the database or not
    const userExists=await User.findOne({email:email});
    const hashedPassword=userExists.hashedPassword; //get hashed password from database
    //if user exists then
    try{
        if(userExists){
            if(await bcrypt.compare(password,hashedPassword) && email===userExists.email){
                const token = jwt.sign({ username },  //created jwt token here
                    process.env.JWT_SECRET_KEY, { 
                        expiresIn: 86400 
                    });
                    req.session.token=token;
                    console.log(req.session.token.toString());
                    // console.log(req.session);
                    // console.log(req.session.token.toString());
                req.flash('success',`welcome ${username} to wanderlust`);
                req.session.loggedIn=true;//if user is logged in then set session to true
                return res.redirect('/listings');
            }else{
                // if user does not exists or incorrect credentials
                req.flash('failure','incorrect credentials try again.');
                return res.redirect('/user/login');
            }
            //if any error occurred while checking user credentials.
        }else{
            req.flash('failure','user does not exists');
            return res.redirect('/user/login');
        }
    }catch(error){
        console.log(error);
        req.flash('failure','some error occurred pls try again');
        res.redirect('/user/login');
        return next();
    }
});
//logout route
router.get('/logout',(req,res)=>{
    if(req.session.loggedIn){
        req.session.loggedIn=false;
        req.session.destroy();
        req.flash('success','logged out successfully');
        return res.redirect('/user/login');
    }else{
        req.flash('failure','you are not logged in');
        return res.redirect('/user/login');
    }
});

export default router;