import express from "express";
import { Listing } from "./models/listings.model.js";
import review from "./models/review.model.js";
import path from "path";
import methodOverride from "method-override";
import { __dirname } from "./public/utils.js";
import { initializeDb } from "./init/mongoDbConnection.js";
import ejsMate from "ejs-mate";
import process from "process";
import {listingSchemaJoi,reviewSchemaJoi} from "./schemaValidation.js";
import globalErrorHandler from "./controllers/globalErrorHandler.js";
import asyncErrorHandler from "./controllers/asyncErrorHandler.js"
import CustomExpressError from "./controllers/expressError.js";
import validateReview from "./public/js/validateReview.js";
// ------------------------------------------------------------
const app = express();
const err=new CustomExpressError();
// Set up EJS engine with ejs-mate for layouts
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(),"/views"));

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "/public"))); // Corrected path for static files
app.use(methodOverride("_method"));
const validateSchema=function(req,res,next){
    let ans=listingSchemaJoi(req.body);
    if(ans.error){
        return res.render('printError.ejs',{ans});
    }else{
        return next();
    }
}
try{
    // Initialize database connection
await initializeDb();
}catch(error){
    console.log("some error occurred");
}

// Middleware to set Content-Type header to text/html for all responses
app.use((err,req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    
    next();
});

// Home route
app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

// Index Route - shows all listings
app.get("/listings", asyncErrorHandler(async (req, res,next) => {
    const allListings = await Listing.find({});
    res.render("./listings/index", { allListings });
}));

// Route to render form for new listing
app.get('/listings/new', (req, res) => {
    res.render('./listings/newForm');
});

// Create new listing route
app.post('/listings', validateSchema,asyncErrorHandler(async (req, res,next) => {
    const newListing = req.body.newlisting;
    const result = new Listing(newListing);
    await result.save();
    res.redirect('/listings');
}));

// Edit route - render form for editing a listing
app.get('/listings/:id/edit', asyncErrorHandler(async (req, res,next) => {
    let { id } = req.params;
    const result = await Listing.findById(id);
    res.render('./listings/editForm', { result });
}));

// Show route - displays details of a specific listing
app.get('/listings/:id', asyncErrorHandler(async (req, res,next) => {
    let { id } = req.params;
    const result = await Listing.findById(id);
    res.render('./listings/show', { result });
}));

// Update route - updates a listing
app.put('/listings/:id', validateSchema,asyncErrorHandler(async (req, res,next) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.newlisting });
    res.redirect(`/listings/${id}`);
}));

// Delete route - deletes a listing
app.delete('/listings/:id', asyncErrorHandler(async (req, res,next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
}));
//review route
app.post('/listings/:id/reviews',validateReview,async (req,res,next)=>{
    let result=await Listing.findById(req.params.id);
    let newReview= new review(req.body.review);
    result.reviews.push(newReview);
    await newReview.save();
    await result.save();
    console.log("new review saved");
    res.send("new review saved");
    
})
app.use(globalErrorHandler);
// Start the server
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});