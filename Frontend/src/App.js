
import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./index.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Component/Auth/Login";
import Register from "./Component/Auth/Register";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

import axios from "axios";
import Navbar from "./Component/Layout/Navbar";
import Footer from "./Component/Layout/Footer";
import Home from "./Component/Home/Home";
import Jobs from "./Component/Job/Jobs";
import JobDetail from "./Component/Job/JobDetail";
import Application from "./Component/Application/Application";
import MyApplication from "./Component/Application/MyApplication";
import PostJob from "./Component/Job/PostJob";
import NotFound from "./Component/NotFound/NotFound";
import MyJob from "./Component/Job/MyJob";
const App = () => {
  const {isAuthorized, setIsAuthorized, setUser, } = useContext(Context);


  const options = {
    color:'blue',
    position: 'top-right',
    duration: 2000,

    style: {
      backgroundColor: 'blue',
      color: 'white',
      borderRadius: '15px',
      padding: '16px',
      fontSize: '16px',
      // borderRad:'50px'
    }
  
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/reg/getuser",
          { 
          withCredentials: true 
        }
        );
        setUser(response.data.user);
        console.log(response.data.user)
        console.log(response)

        // console.log(`id is this ${response.data.user._id}`)
        console.log(response.data.user.role)
        toast.success('user successfully login ')

        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false)
        // toast.success('Please login or register ')
      }
    };
    fetchUser();
  },[isAuthorized]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Home/>} />
          <Route path="/job/getall" element={<Jobs/>} />
          <Route path="/job/:id" element={<JobDetail/>} />
          <Route path="/application/:id" element={<Application/>} />
          <Route path="/application/me" element={<MyApplication/>} />
          <Route path="/job/post" element={<PostJob/>} />
          <Route path="/job/me" element={<MyJob/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        <Footer />
        <Toaster toastOptions={options} />
        </BrowserRouter>
    </>
  );
};

export default App;