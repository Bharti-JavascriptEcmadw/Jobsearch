import jobseekerModel from "../models/jobseekerModel.js"

import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose"
import { uploadFile } from "../middleware/uploadmiddleware.js";

export const employergetAllApplication=async(req,res,next)=>{
   const {role}=req.user;
   console.log(req.user)
    if(role==='Job seeker'){
        return next("Job seeker is not allowed to access this page ")
    }
    const {_id}=req.user;
    const applications= await jobseekerModel.find({'employerID.user':_id});
    res.status(200).json({
        success:true,
        applications
    })
    };


export const jobseekergetAllApplication=async(req,res,next)=>{
    const {role}=req.user;

    if(role==='Employer'){
        return next("Job seeker is not allowed to access this page ")
    }
    const {_id}=req.user;
    console.log(_id)

    const applications= await jobseekerModel.find({'applicantID.user':_id});
    console.log(applications)
    res.status(200).json({
        success:true,
        applications
    })
};


// ??? DElete application


export const jobseekerDeleteApplication = async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
      return next("Employer not allowed to access this resource.");
  }
  console.log(role)
  // !! and we get userid through req.user both job and and user id is change 
  // !! so both get way is  different so carefully we want to delete particulara job 

  // !! here get job id through params for delete of job 
  const { id } = req.params;
  console.log(id)
  // const id = 'valid_id_here'; // Replace with a valid ID for testing
  // console.log('Static ID used for testing:', _id);

  try {
      const application = await jobseekerModel.findById(id);
      if (!application) {
          return res.status(404).json({
              success: false,
              message: "Application not found!"
          });
      }
      await application.deleteOne();
      res.status(200).json({
          success: true,
          message: "Application Deleted!",
      });
  } catch (error) {
      console.error('Server Error:', error);
      res.status(500).json({
          success: false,
          message: 'An error occurred on the server'
      });
  }
};

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1 p


export const postApplication = async (req, res, next) => {
  const { role } = req.user;

  // Check if the user is a job seeker
  if (role === 'Employer') {
    return next('Employer not allowed to access this resource.');
  }

  // Use multer middleware to handle file upload
  uploadFile(req, res, async (err) => {
    if (err) {
      console.error('Multer Error:', err); // Log the error
      return next('File upload failed.');
    }
  
  
    // Proceed with application creation...

  

    try {
      // Extract data from request body
      const { name, email, coverLetter, phone, address,  jobId} = req.body;

      // Validate jobId
      if (!jobId) {
        return next('Job ID is required.');
      }

      // Check if the job exists
      const jobDetails = await jobsModel.findById(jobId);
      if (!jobDetails) {
        return next('Job not found.');
      }

      // Construct applicantID and employerID
      const applicantID = { user: req.user._id, role: 'Job seeker' };
      const employerID = { user: jobDetails.createdBy, role: 'Employer' };

      // Validate all required fields
      if (!name || !email || !coverLetter || !phone || !address  ) {
        return next('Please fill all fields.');
      }

      // Create a new application
      const application = await jobseekerModel.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        resume: req.file ? {
          img_pdf_name: req.file.filename, // फाइल का नाम GridFS के लिए
          url: `http://localhost:8000/uploads/${req.file.filename}`, // अपलोड की गई फाइल का URL
        } : undefined,
        applicantID,
        employerID,
      
      });
          console.log('Uploaded file:', req.file); // Log the uploaded file info


      // Respond with success
      res.status(200).json({
        success: true,
        message: 'Application Submitted!',
        application
      });
    } catch (error) {
      console.error('Error in postApplication:', error);
      return next('Failed to submit application.');
    }
  });
};
