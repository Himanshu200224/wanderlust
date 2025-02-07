import express from "express";
import { initializeDb } from "./init/mongoDbConnection.js";
import flash from "connect-flash";
import  session  from "express-session";
import cors from "cors";
import globalErrorHandler from "./controllers/globalErrorHandler.js";
import path from "path";
import methodOverride from "method-override";
import { __dirname } from "./public/utils.js";
import ejsMate from "ejs-mate";
import process from "process";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes  from "./routes/reviewRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";

//------------------------------------------------------------
const app = express();
// Set up EJS engine with ejs-mate for layouts
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(),"/views"));
// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "/public"))); // Corrected path for static files
app.use(methodOverride("_method"));
app.use(cors());
//creating session options here
const sessionOptions={secret:"mysupersecretcode",resave:false,saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }
};
app.use(session(sessionOptions));
app.use(flash());
try{
    // Initialize database connection
await initializeDb();
}catch(error){
    console.log("some error occurred",error);
}
// Middleware to set Content-Type header to text/html for all responses
app.use((err,req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    next();
});
//flash middleware
try{
    app.use((req,res,next)=>{
        res.locals.success=req.flash('success');
        return next();
    });
}catch(error){
    alert(error.message);
    next();
}
// Home route
app.get("/", (req, res) => {
    res.send("Hi, I am root");
});
app.get("/login",(req,res)=>{
    res.render('./users/login');
});
app.use('/listings',listingRoutes);
app.use('/listings/:id/review',reviewRoutes)
app.use('/signup',userRoutes);
app.use(globalErrorHandler);
// Start the server
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});