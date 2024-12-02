import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../index.js";
import { useNavigate } from "react-router-dom";

function MyJob() {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
      return;
    }


    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/job/getmyjob",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }

        );
        console.log("API Response Data:", data.myjob);
        setMyJobs(data.myjob);

      } catch (error) {
        console.error("Fetch error:", error); // Log errors
        toast.error(error.response?.data?.message || 'Failed to fetch jobs');
        setMyJobs([]);
      }
    };

    fetchJobs();
  }, [isAuthorized,navigateTo]);


  
  // Function For Enabling Editing Mode
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  // Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };


  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    console.log(updatedJob)
    await axios
      .patch(`http://localhost:8000/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };



  //?????? Function For Deleting Job
  const handleDeleteJob = async (jobId) => {
  console.log(`current job id ${jobId}`)

    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/v1/job/delete-job/${jobId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setMyJobs((myJobs) => myJobs.filter((job) => job._id !== jobId));
      console.log(data)
    } catch (error) {
      console.error("Delete failed:", error); // Log errors
      toast.error(error.response?.data?.message || 'Failed to delete job');
    }
  };
 const handleInputChange = (jobId, field, value) => {
 setMyJobs((prevJobs) =>
   prevJobs.map((job) => job._id === jobId ? { ...job, [field]: value } : job
    )
    );
  };


  return (
    <div className="myJobs page">
      <div className="container">
        <h1>Your Posted Jobs</h1>
        {myJobs.length > 0 ? (
          <div className="banner">
            {myJobs.map((element) => (
              <div className="card" key={element._id}>
                <div className="content">
                  <div className="short_fields">
                    <div>
                      <span>Company:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.company}
                        onChange={(e) => handleInputChange(element._id, 
                                        "company", e.target.value)} />
                    </div>
                    <div>
                      <span>position:</span>
                      <select
                        value={element.position}
                        onChange={(e) => handleInputChange(element._id, "position", e.target.value)}
                        disabled={editingMode !== element._id}
                      >
                        <option value="Graphics & Design">Graphics & Design</option>
                        <option value="Graphics & Design">Graphics & Design</option>
 {/* Other options */}
                      </select>
                    </div>
                     <div>
                      <span>Country:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.country}
                        onChange={(e) => handleInputChange(element._id, 
                                        "country", e.target.value)} />
                    </div>

                


                  </div>
                  <div className="long_field">
                      <div>
                      <span>Salary:{""}
                      {element.fixedSalary ?
                      
                       <input
                        type="number"
                        disabled={editingMode !== element._id}
                        value={element.fixedSalary}
                        onChange={(e) => handleInputChange(element._id, 
                                        "fixedSalary", e.target.value)} />
                        :
                        <div>
                        <input
                        type="number"
                        disabled={editingMode !== element._id}
                        value={element.salaryFrom}
                        onChange={(e) => handleInputChange(element._id, 
                                        "salaryFrom", e.target.value)} />
                         <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.salaryTo}
                        onChange={(e) => handleInputChange(element._id, 
                                        "salaryTo", e.target.value)} />
                        
                                  
                        </div>}
                        </span>
                     
                    </div>

                    
                      <div>
                      <span>City:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.city}
                        onChange={(e) => handleInputChange(element._id, 
                                        "city", e.target.value)} />
                    </div>
                    <div>
                      <span>Description:</span>
                      <textarea
                        rows={5}
                        value={element.description}
                        disabled={editingMode !== element._id}
                        onChange={(e) => handleInputChange(element._id, "description", e.target.value)} />
                    </div>

                  </div>

                </div>
                <div className="button_wrapper">
                  <div className="edit_btn_wrapper">
                    {editingMode === element._id ? (
                      <>
                        <button
                          onClick={() => handleUpdateJob(element._id)}
                          className="check_btn"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => handleDisableEdit()}
                          className="cross_btn"
                        >
                          <RxCross2 />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEnableEdit(element._id)}
                        className="edit_btn"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteJob(element._id)}
                    className="delete_btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You've not posted any job or maybe you deleted all of your jobs!</p>
        )}
      </div>
    </div>
  );
}

export default MyJob;
