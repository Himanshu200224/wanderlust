import {mongoose} from "mongoose";
// import Joi from "joi";
// import review from "./review.model";
const Schema=mongoose.Schema;
const listingSchema=Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:"https://picsum.photos/536/354",
        set : (v)=> v === "" ? "https://skift.com/wp-content/uploads/2023/04/zany-jadraque-ZCRtfop2hZY-unsplash.jpg" : v,
        unique:true
    },
    price:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        // required:true
    }
});
export const Listing=mongoose.model("Listing",listingSchema);

