import express from 'express';
import review from '../models/review.model.js';
import { reviewSchemaJoi } from '../schemaValidation.js';
import { Listing } from '../models/listings.model.js';
const router = express.Router({mergeParams:true});
//validating review schema here
// const validateReview=function(req,res,next){
//     let ans=reviewSchemaJoi(req.body);
//     if(ans.error){
//         return res.render('printError.ejs',{ans});
//     }else{
//         return next();
//     }
// }
//review route
router.post('/',(async (req,res)=>{
    // for creating new review and storing in db.
    console.log(req.params.id);
    let result=await Listing.findById(req.params.id);
    let newReview= new review(req.body.review);
    result.reviews.push(newReview);
    await newReview.save();
    await result.save();
    console.log("new review saved");
    req.flash('success', 'new review added Successfully!');
    res.redirect(`/listings/${req.params.id}`);
    
}));
//delete review route
router.delete('/:reviewId',(async (req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await review.findByIdAndDelete(reviewId);
    req.flash('success', 'review deleted Successfully!');
    res.redirect(`/listings/${id}`);
}));
export default router;