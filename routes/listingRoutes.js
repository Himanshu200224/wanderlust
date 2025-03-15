import express from 'express';
import {Listing} from '../models/listings.model.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import passportLocal from 'passport-local';
import { listingSchemaJoi } from '../schemaValidation.js';
import asyncErrorHandler from '../controllers/asyncErrorHandler.js';
// import { verifyTokenMiddleware } from '../middlewares/verifyTOkenMiddleware.js';
const router = express.Router({mergeParams:true});
const app=express();

// Index Route - shows all listings
router.get('', asyncErrorHandler(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index", { allListings });
}));
// Route to render form for add new listing
router.get('/new', (req, res) => {
    return res.render('./listings/newForm');
});
// Create new listing route
router.post('',asyncErrorHandler(async (req, res) => {
    const newListing = req.body.newlisting;
    const result = new Listing(newListing);
    await result.save();
    req.flash('success', 'Successfully made a new listing!');
    return res.redirect('/listings'); 

}));
// Edit route - render form for editing a listing
router.get('/:id/edit', asyncErrorHandler(async (req, res) => {
    if(!req.session.loggedIn){
        //if user is not logged in then redirect to login page
        req.flash('failure','you are not logged in please login first');
        return res.redirect('/user/login');
    }
    let { id } = req.params;
    const result = await Listing.findById(id);
    req.flash('success', 'listing edited successfuly!');
    return res.render('./listings/editForm', { result });
}));
// Show route - displays details of a specific listing
router.get('/:id', asyncErrorHandler(async (req, res) => {
    let { id } = req.params;
    const result = await Listing.findById(id).populate('reviews').populate('owner');
    res.render('./listings/show', { result });
}));
// Update route - updates a listing
router.put('/:id',asyncErrorHandler(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.newlisting });
    req.flash('success', 'Successfully updated listing!');
    return res.redirect(`/listings/${id}`);
}));
// Delete route - deletes a listing
router.delete('/:id',asyncErrorHandler(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted listing!');
    return res.redirect('/listings');
}));

export default router;