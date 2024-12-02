import mongoose from 'mongoose'

const jobSchema =new mongoose.Schema({
    company:{
        type:String,
        // required:[true, 'company name is required']
    },
    position:{
        type:String,
        // required:[true,'Job position is required'],
        minlength:[2,"Job title must contain two letter"]
    },
    
    description:{

        type:String,
        required:[true, " please provide description "]
    },
    status:{
        type:String,
        enum:['pending','reject','interview'],
        default:'pending'
    },
    workType:{
        type:String,
        enum:['full-time', 'part-time', 'internship', 'contract']
    },
    city:{
        type:String,
        default:'Mumbai',
        // required:[true, 'work location is required']
    },
    country:{
        type:String,
        required:true,
        default:"India",
    },
    location:{
        type:String,
        default:"India",
        // required:[true,"please provide exact address"]
    },
    fixedSalary:{
        type:Number,
        minlength:2,
        maxlength:9,
        
    },
    salaryFrom:{
        type:Number,
        minlength:[2, "Salary from must contain 4 digit "],
        maxlength:[9, " Salary not exceed more than 9 digits"]
    },
    salaryTo:{
        type:Number,
        minlength:[2, "Salary To must contain 4 digit "],
        maxlength:[9, " Salary not exceed more than 9 digits"]
    },

    expired:{
        type:Boolean,
        
    },
    jobpostedOn:{
        type:Date,
        default:Date.now
    }, 
    createdBy:{
            type:mongoose.Schema.Types.ObjectID,
            reference:"User",
            required:true
        }},
        
  {timestamps:true}
    )
export  default mongoose.model ('Job', jobSchema)

  

