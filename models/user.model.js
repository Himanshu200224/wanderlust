import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        minLength:3,
        maxLength:40,
        lowercase:true,
        default:"somebody",
        // match: [/^[a-zA-Z0-9]+$/, 'is invalid'] // Validation: Regex for username format
    },
    hashedPassword:{
        type:String,
        required:true,
        default:"password",
        minLength:8,
        // maxLength:25,
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
userSchema.plugin(passportLocalMongoose,{usernameField:"email"});
export const User=mongoose.model("User",userSchema);
