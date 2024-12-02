  import React, { useContext, useState } from "react";
  import { MdOutlineMailOutline } from "react-icons/md";
  import { RiLock2Fill } from "react-icons/ri";
  import { Link, Navigate } from "react-router-dom";
  import { FaRegUser } from "react-icons/fa";
  import axios from "axios";
  import toast from "react-hot-toast";
  import { Context } from "../../index.js";


  const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const { isAuthorized, setIsAuthorized } = useContext(Context);
    console.log(isAuthorized)

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "http://localhost:8000/api/v1/reg/login",
          { email, password, role },
          {
            withCredentials: true,
             headers: {
              "Content-Type": "application/json",
            },
          }
        );
    
        console.log("Login response:", data); // Log the response
        
        toast.success(data.message);
        setEmail("");
        setPassword("");
        setRole("");
        setIsAuthorized(true);
        // setUser(data) 
        //yaha per user variable meekobjectstore hoga user.user.role user.token
      
        
        console.log(data)
      } catch (error) {
        console.error("Login error:", error); // Log the full error
        const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
        toast.error(errorMessage);
      }
    };
    
    if (isAuthorized) {
      return <Navigate to={"/"}/>;
    }

    return (
      <div className="x">
      <section className="authPage">
          <div className="container">
            <div className="header">
              <img  src="/img/logo.jpg" alt="logo" />
              <h3>Login to your account</h3>
            </div>
            <form>
              <div className="inputTag">
                <label>Login As</label>
                <div>
                  <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Select Role</option>
                    <option value="Employer">Employer</option>
                    <option value="Job seeker">Job seeker</option>
                  </select>
                  <FaRegUser />
                </div>
              </div>
              <div className="inputTag">
                <label>Email Address</label>
                <div>
                  <input
                    type="email"
                    placeholder="email@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MdOutlineMailOutline />
                </div>
              </div>
              <div className="inputTag">
                <label>Password</label>
                <div>
                  <input
                    type="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <RiLock2Fill />
                </div>
              </div>
              <button type="submit" onClick={handleLogin}>
                Login
              </button>
              <Link to={"/register"}>Register Now</Link>
            </form>
          </div>
          <div className="banner">
            <img src="/img/banner2.jpg" alt="login" />
          </div>
        </section>
      
      </div>
    );
  };
  

  export default Login;
