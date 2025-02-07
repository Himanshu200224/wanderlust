import mongoose from "mongoose";
export async function connectDb() {
        try{
            mongoose.connect('mongodb://localhost:27017/wanderlust')
            .then(() => {
                console.log('Database connected');
            }).catch((error) => {
                console.log('Database connection failed:', error);
            });
        }catch(error){
            console.log("some error occured");
            console.log(error);
        }
}

