import express from "express";
import helmet from "helmet";
import path from "path";
import {connectDb} from "./mongoDbConnection.js";
import {listing} from "./models/listings.model.js";
import {__dirname} from "./staticFiles/utils.js";
const app=express();
//-----------middlewraes for safety and serving statict files-----------------------
app.use(helmet());//kursi ki petti bandh li.
app.use(express.static(path.join(__dirname + "./staticFiles")));//koi bhi data frontend par show karne ke liye.
//-----------------------------------------------------------------------------------

app.get('/',function(req,res){
    res.send("success");
    // next();
});
connectDb();//database connection here.
app.post('/list',async function(req,res){
    const user=new listing({
        title:"my new villa",
        discription:"delhi ke centre mein",
        price:20000,
        country:"India",
        location:"kanot place,delhi",
    });
    await user.save().then(function(result){
        //agar data successfully save ho jata hai db mein toh
        console.log(result)
        res.status(200).json({message:"data saved successfully"});
    }).catch(function(error){
        res.status(400).json({message:error.message});
    })
})
app.listen(3000);
console.log("app is listening on port 3000");