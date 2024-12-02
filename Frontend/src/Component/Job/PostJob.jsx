
import React, { useContext,  useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../index.js";
const PostJob = () => {
  const [position, setposition] = useState("");
  const [description, setDescription] = useState("");
  const [company, setcompany] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized,setIsAuthorized } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();

    try {


      if (salaryType === "Fixed Salary") {
        setSalaryFrom("");
        setSalaryTo(""); // Clear range fields if fixed salary is selected
    } else if (salaryType === "Ranged Salary") {
        setFixedSalary(""); // Clear fixed salary field if range salary is selected
    } else {
        setSalaryFrom("");
        setSalaryTo("");
        setFixedSalary(""); // Clear all salary fields if no valid salary type is selected
    }
  
        // Making the POST request with the correct headers and payload
        const response = await axios.post(
            "http://localhost:8000/api/v1/job/post",
            fixedSalary.length >= 4
                ? {
                    position,
                    description,
                    company,
                    country,
                    city,
                    location,
                    fixedSalary,
                }
                : {
                    position,
                    description,
                    company,
                    country,
                    city,
                    location,
                    salaryFrom,
                    salaryTo,
                },
            {
                headers: {
                    "Content-Type": "application/json",
                  
                },
                withCredentials: true,
                }
        );

        // If the job post is successful, clear the form and display a success message
        toast.success(response.data.message);
        setIsAuthorized(true);
        setposition("");
        setDescription("");
        setcompany("");
        setSalaryFrom("");
        setSalaryTo("");
        setCountry("");
        setCity("");
        setLocation("");

        
    // Reset the salary fields based on salary type


    } catch (error) {
        console.error("Job post error:", error); // Log the full error
        const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
        toast.error(errorMessage);
                console.error("Job post error:", error); // Log the full error


    }
};

  const navigateTo = useNavigate();
  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <>
      <div className="job_post page">
        <div className="container">
          <h3>POST NEW JOB</h3>

          <form onSubmit={handleJobPost}>
            <div className="wrapper">
              <input
                type="text"
                value={company}
                onChange={(e) => setcompany(e.target.value)}
                placeholder="Company"
              />
              <select
                value={position}
                onChange={(e) => setposition(e.target.value)}
              >
                <option value="">Select Position</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Frontend Web Development">
                  Frontend Web Development
                </option>
                <option value="MERN Stack Development">
                  MERN STACK Development
                </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">
                  MEAN STACK Development
                </option>
                <option value="MEVN Stack Development">
                  MERN STACK Development
                </option>
                <option value="Data Entry Operator">Data Entry Operator</option>
              </select>
            </div>


            <div className="wrapper">
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
              />


              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />

            <div className="salary_wrapper">
              <select
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}>
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
              <div>
                {salaryType === "default" ? (
                  <p>Please provide Salary Type *</p>
                ) : salaryType === "Fixed Salary" ? (
                  <input
                    type="number"
                    placeholder="Enter Fixed Salary"
                    value={fixedSalary}
                    onChange={(e) => setFixedSalary(e.target.value)}
                  />
                ) : (
                  <div className="ranged_salary">
                    <input
                      type="number"
                      placeholder="Salary From"
                      value={salaryFrom}
                      onChange={(e) => setSalaryFrom(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Salary To"
                      value={salaryTo}
                      onChange={(e) => setSalaryTo(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Job Description"
            />
            <button  type="submit">Create Job</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostJob;
