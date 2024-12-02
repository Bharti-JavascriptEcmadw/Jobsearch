import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../index.js";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from './ResumeModal.jsx'

const MyApplication = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const navigateTo = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  useEffect(() => {
    
      try {

        if(user&&user.role==="Employer"){
          axios.get( `http://localhost:8000/api/v1/application/employer/getall`
             , {withCredentials:true})
          .then((res)=>{setApplications(res.data.applications)});
        }
        else{
          axios.get(  
        `http://localhost:8000/api/v1/application/jobseeker/getall`
          , {withCredentials:true})
          .then((res)=>{setApplications(res.data.applications)})
        }
      
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Unauthorized access. Please login again.");
          navigateTo("/login");
        } else {
          toast.error(error.response?.data?.message || "An error occurred");
        }
      }
    

    // if (isAuthorized) {
    //   fetchApplications();
    // } else {
    //   navigateTo("/login");
    // }
  },[isAuthorized]);

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:8000/api/v1/application/delete/${id}`, { withCredentials: true })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    console.log(imageUrl)
    setResumeImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setResumeImageUrl("");
  };

  return (
    <section className="my_applications page">
      {isModalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
      {user === "Job Seeker" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length === 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <JobSeekerCard
                element={element}
                key={element._id}
                openModal={openModal} // Pass the openModal function
                deleteApplication={deleteApplication}
              />
            ))
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Job Seekers</h1>
          {applications.length === 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <EmployerCard
                element={element}
                key={element._id}
                deleteApplication={deleteApplication}
                openModal={openModal} // Pass openModal here as well
              />
            ))
          )}
        </div>
      )}
    </section>
  );
};

const JobSeekerCard = ({ element, deleteApplication, openModal }) => (
  <div className="job_seeker_card">
    <div className="detail">
      <p><span>Name:</span> {element.name}</p>
      <p><span>Email:</span> {element.email}</p>
      <p><span>Phone:</span> {element.phone}</p>
      <p><span>Address:</span> {element.address}</p>
      <p><span>Cover Letter:</span> {element.coverLetter}</p>
    </div>
    <div className="resume">
      {element.resume?.url ? (
        <button onClick={() => openModal(element.resume.url)}>View Resume</button>
      ) : (
        <p>No Resume Available</p>
      )}
    </div>


    <div className="resume">
      <img src={element.resume.url} alt="df" 
      onClick={()=>openModal(element.resume.url)} />

    </div>
    <div className="btn_area">
      <button onClick={() => deleteApplication(element._id)}>Delete Application</button>
    </div>
  </div>
);

const EmployerCard = ({ element, deleteApplication, openModal }) => (
  <div className="job_seeker_card">
    <div className="detail">
      <p><span>Name:</span> {element.name}</p>
      <p><span>Email:</span> {element.email}</p>
      <p><span>Phone:</span> {element.phone}</p>
      <p><span>Address:</span> {element.address}</p>
      <p><span>Cover Letter:</span> {element.coverLetter}</p>
    </div>
    <div className="resume">
  {element.resume?.url ? (
    <a href={element.resume.url} rel="noopener noreferrer">
      <button>View Resume</button>
    </a>
  ) : (
    <p>No Resume Available</p>
  )}
</div>

    <div className="resume">
      <img src={element.resume.url} alt="df" 
      onClick={()=>openModal(element.resume.url)} />

    </div>
    <div className="btn_area">
      <button onClick={() => deleteApplication(element._id)}>Delete Application</button>
    </div>
  </div>
);

export default MyApplication;
