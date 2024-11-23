import { connectDb } from "../mongoDbConnection.js";
import {sampleListings as initData} from "./data.js";
import { Listing } from "../models/listings.model.js";
export const initializeDb = async function () {
    connectDb();//database connection established
    await Listing.deleteMany({});//if nay data is present in db already then it will be wiped out whenever this function is called or node app is running.
    await Listing.insertMany(initData).then((result)=>{
        //insertMany takes array of objects(documents) aur ek ek karke db mein store karta hai.
        console.log("data was saved");
    }).catch((error)=>{
        console.log("some error occured");
        throw error;
    })
};



