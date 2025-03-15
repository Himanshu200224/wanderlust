import express from "express";
import { initializeDb } from "./init/mongoDbConnection.js";
import flash from "connect-flash";
import session from "express-session";
import cors from "cors";
import globalErrorHandler from "./controllers/globalErrorHandler.js";
import path from "path";
import methodOverride from "method-override";
import { __dirname } from "./public/utils.js";
import ejsMate from "ejs-mate";
import process from "process";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import { User } from "./models/user.model.js";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
// import { initializePassport } from "./passport-config.js";
//------------------------------------------------------------
const app = express();
// Set up EJS engine with ejs-mate for layouts
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "/views"));
// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "/public"))); // Corrected path for static files
app.use(methodOverride("_method"));
app.use(cors());
//creating session options here
const sessionOptions = {

    secret: "mysupersecretcode", resave: false, saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};
const localStrategy=LocalStrategy.Strategy //using the local strategy part to authenticate user with username and password.
app.use(session(sessionOptions));
app.use(flash());
// passport usage here
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy({usernameField:'email'},User.authenticate()));
passport.serializeUser(User.serializeUser());//saves user information.
passport.deserializeUser(User.deserializeUser());
try {
    // Initialize database connection
    await initializeDb();
} catch (error) {
    console.log("some error occurred", error);
}

// Middleware to set Content-Type header to text/html for all responses
app.use((err, req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    next();
});
//flash middleware
try {
    app.use((req, res, next) => {
        res.locals.success = req.flash('success');
        res.locals.failure = req.flash('failure');
        return next();
    });
} catch (error) {
    alert(error.message);
    next();
}
// Home route
app.get("/", (req, res) => {
    res.send("Hi, I am root");
});


app.use('/listings', listingRoutes);
app.use('/listings/:id/review', reviewRoutes)
app.use('/user', userRoutes);
// Error handling middleware
app.use(globalErrorHandler);
// Start the server
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});