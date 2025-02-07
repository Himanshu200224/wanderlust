import { connectDb } from "../public/js/databaseConnection.js";
import {sampleListings as initData} from "./data.js";
import { Listing } from "../models/listings.model.js";
export const initializeDb = async function () {
    connectDb();//database connection established
    await Listing.deleteMany({}); //deletes all the documents in the collection
    await Listing.insertMany(initData).then((result)=>{
        //insertMany takes array of objects(documents) aur ek ek karke db mein store karta hai.
        console.log("data was saved");
    }).catch((error)=>{
        console.log("some error occured", error);
        throw error;
    })
};

