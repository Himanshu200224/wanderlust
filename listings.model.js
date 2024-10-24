import {mongoose} from "mongoose";
const Schema=mongoose.Schema;
const listingSchema=Schema({
    title:{
        type:String,
        required:true,
    },
    discription:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:"https://picsum.photos/536/354",
        set:function(value){//agar image ka url data mein hua toh woh url assing ho jaayega image ko nahi toh null ya phir default value assign ho jayegi.
            if(value.hasOwnProperty==url){
                return url;
            }
            return null;
        },
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
});
export const listing=mongoose.model("listing",listingSchema);//db main listings naam ka collection banega.
