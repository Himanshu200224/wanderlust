import mongoose from "mongoose";
import { Schema } from "mongoose";

const reviewSchema=new Schema({
    comment:{
        type:String,
    },
    ratings:{
        type:Number,
        min:1,
        max:5,
        default:1
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
});
const review=mongoose.model('review',reviewSchema);
export default review;