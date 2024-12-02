


// ?????? Database connection

import mongoose from "mongoose";

const Connectdb=async()=>{
    try{
   const conn=await mongoose.connect(process.env.Mongo_url)
   console.log("connected to mongodb database")
    }
    catch(err){
        console.log(`Mongoose connection error ${err}`)

    }
}
 export default Connectdb;