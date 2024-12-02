
import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How JobPortal  Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
              Create a Job: Log in as an employer, 
              navigate to the "Create Job" section, and fill out the job details, including title, description, requirements, and location.


              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Job/Post a Job</p>
              <p>
              Post the Job: After reviewing the job details, click "Post Job" to make the listing live on the portal, where job seekers can view and apply.
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Manage Applications</p>
              <p>
              Manage Applications: Once the job is posted, you can monitor applications, communicate with candidates, and manage the hiring process through your employer dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
