import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:3,
        maxLength:40,
        lowercase:true,
        default:"somebody",
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'] // Validation: Regex for username format
    },
    password:{
        type:String,
        required:true,
        default:"password",
        minLength:8,
        maxLength:25,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'] // Validation: Regex for password format
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        default:"somebody@gmail.com",
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] // Validation: Regex for email format
    },
});
export const User=mongoose.model("User",userSchema);
//mongoose.model ek schema bana dega users naam ka on the basis of userSchema mein jo fields define ki jaayengi