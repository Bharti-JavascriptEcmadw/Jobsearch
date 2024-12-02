import jobsModel from "../models/jobsModel.js"
import mongoose from "mongoose"
import  moment from 'moment'

//!! job seeker see the job 
export const getAlljob=async(req,res)=>{
    // const {id}=req.params;
    const job=await jobsModel.find({});
console.log(job)
   res.status(200).json({
    success:true,
    job
 }) ;
   
};




//!! Search filter through query string search  job 

export const getAllJobsController=async( req, res, next)=>{

    
    // const jobs=await jobsModel.find({}});
     
    const {status,workType,search,sort}=req.query
    const queryObject={
        createdBy:req.user.userID
                    }
     //??Logic

    if(status && status !=='all'){

        queryObject.status=status
    }

    if(workType&& workType!=='all'){
        queryObject.workType=workType;
    }


    if(search){
        queryObject.position={$regex: search , $options:"i"};
    }


    let queryResult=jobsModel.find(queryObject)


    if(sort==='latest'){
        queryResult=queryResult.sort('-createdAt')
    }

    


    if(sort==='oldest'){
        queryResult=queryResult.sort('createdAt')
    }

    if(sort==='a-z'){
        queryResult=queryResult.sort('position')
    }
    
    if(sort==='z-a'){
        queryResult=queryResult.sort('-position')
    }
    //!!!pagination

    const page=Number(req.query.page)||1
    const limit = Number (req.query.limit)||10
    const skip =(page-1)*limit ;
    queryResult =queryResult.skip(skip).limit(limit)
    //jobs count 
    const totalJobs=await jobsModel.countDocuments(queryResult)
    const numbOfPage=Math.ceil(totalJobs/limit)

    
    const job=await queryResult;

    
     res.status(200).json({
        totalJobs:job.length,
        job,
        numbOfPage
     })
}

// ????? update job ------------------------------

export const updateJobcontroller =async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        "Job Seeker not allowed to access this resource."
      );
    }
    console.log(role)
    const { id } = req.params;
    console.log(id)
    let job = await jobsModel.findById(id);
    console.log(job)
    if (!job) {
      return next("OOPS! Job not found.");
    }
    
    const jobs = await jobsModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    console.log(`updated version is ${jobs}`)
    res.status(200).json({
      success: true,
      message: "job updated successfully",
      jobs,
    });
  };
  
//!!!!!!!!!!!!!!!!!!!!!!!!


export const deleteJobController = async (req, res, next) => {
    try {
        const {_id}=req.user;
        console.log(_id)
        const { role} = req.user; // Extract user info from token

        // Check user role
        if (role === 'Job seeker') {
            return res.status(403).json({ message: 'Job seekers are not allowed to delete jobs.' });
        }

        const { id } = req.params;
        const job = await jobsModel.findById(id);
        console.log(job)
        console.log(job.createdBy.toString())
        console.log(_id)

        // Check if job exists
        if (!job) {
            return res.status(404).json({ message: `No job found with ID ${id}` });
        }

        // Check if the user is authorized to delete the job
        if (_id.toString()!== job.createdBy.toString()) {
            return res.status(401).json({ message: 'You are not authorized to delete this job.' });
        }

        // Delete the job
        await job.deleteOne();
        res.status(200).json({ message: 'Job deleted successfully.' });
    } catch (error) {
        console.error('Error in deleteJobController:', error); // Log error details
        res.status(500).json({ message: 'An error occurred while deleting the job.' });
    }
};


///!!!!!!!!!!!!!!Filter 

export const jobsStatsController=async (req,res)=>{
    const userId = new mongoose.Schema.Types.ObjectId(req.user.userID);

    const stats =await jobsModel.aggregate([
    {

        $match:{
            createdBy:userId,
        },

    },
    {
   
        $group:{
            _id:'$status',
            count:{$sum:1}
        },
    }
    ]);


    const defaultStats={
        pending:stats.pending||0,
        reject:stats.reject||0,
        interview:stats.interview||0
    }

    //monthly application
    let monthlyApplication=await jobsModel.aggregate([
        {$match:{
            createdBy:new mongoose.Schema.Types.ObjectId(req.user.userID)
        }},
        {
            $group:{
                _id:{
                    year:{$year:"$createdAt"},
                    month:{$month:"$createdAt"},


                },
                count:{
                    $sum:1
                },
            },
        },
    ]);
    monthlyApplication=monthlyApplication.map(item=>{
        const {_id:{year,month},count}=item
        const date=moment().month(month-1).year(year).format(`MMM Y`)
        return {date,count}

    })
    .reverse();
    res.status(200)
    .json({total:stats.length , stats, defaultStats, monthlyApplication});


} 


export const getsinglejob = async (req, res, next) => {
    
    const { id } = req.params;
    try {
      const job = await jobsModel.findById(id);
      if (!job) {
        return next('value not found');
      }
      res.status(200).json({
        success: true,
        job,
      });
    } catch (error) {
      console.error('Error fetching job:', error); // Log the error for debugging
      res.status(400).json({
        success: false,
        message: 'Invalid ID / CastError',
      });
    }
  };
  




// !!!!!!Post job---------------------------------

  export const createJobController = async (req, res, next) => {
    // !!2 method destructue user role from req.user req.user comes from auth it store whole user
    const {role}  = req.user;    /*destructure firstway*/
    // const role=req.user.role;  destrueture second way 
    console.log(role);
    if (role === "Job Seeker") {
      return next(
        "Job Seeker  is not allowed to access this resource."
      );
    }
    const {
      position,
      description,
      company,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
    } = req.body;
  
    if (!position || !description || !company || !country || !city || !location) {
      return next("Please provide full job details.",);
    }
  
    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
      return next(
       "Please either provide fixed salary or ranged salary.",
              );
    }
  
    if (salaryFrom && salaryTo && fixedSalary) {
      return next(
        "Cannot Enter Fixed and Ranged Salary together."
      );
    }
    const createdBy = req.user._id;
    console.log(` Employer id who post job id ${createdBy}`)

    const job = await jobsModel.insertMany({
      position,
      description,
      company,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
      createdBy,
    });
    res.status(200).json({
      success: true,
      message: "Job Posted Successfully!",
      job,
    });
  };



   

// !!!employer get all our job 



export const getmyjob = async (req, res, next) => {
    
  const { role } = req.user;
  if (role==="Job seeker"){
    return next('job seeker not allowed to access this resource')
  }
  
    const myjob= await jobsModel.find({createdBy:req.user._id});
    
    res.status(200).json({
      success: true,
      myjob,
    });
  }
