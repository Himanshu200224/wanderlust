import { connectDb } from "../mongoDbConnection.js";
import initData from "./data.js";
import { listing } from "../models/listings.model.js";
import mongoose from "mongoose";
connectDb();//database connection established
const initializeDb = async function () {
    await listing.deleteMany({});
    await listing.insertMany(initData.data);
    console.log("data was saved");
};

initializeDb();
