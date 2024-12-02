import mongoose from "mongoose";
import validator from "validator";
const applicationSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please provide your name "],
        minlength:2,
        maxlength:30
    },
    email:  {
        type:String,
        required:[true,'email is  required'],
        validate:[validator.isEmail, "Please provide a valid email"]
    },
    coverLetter:{
        type:String,
        required:[true,"please provide your cover  letter "]
    },
    phone:{ 
        type: Number,
        required:true,

    },
    address:{
        type:String,
        required:true
    },
    resume:
    {
        img_pdf_name:{
        type:String,},
    url:{
        type:String,},
    },
    applicantID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            // required:true,
        },
        role:{
            type:String,
            enum:["Job seeker"],
            // required:true,
        }
    },

    employerID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            // required:true,
        },
        role:{
            type:String,
            enum:["Employer"],
            // required:true,
        }
    },

});

export default mongoose.model("Application", applicationSchema)