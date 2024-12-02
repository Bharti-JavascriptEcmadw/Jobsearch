
// ????package import 
import express from 'express';
const  app= express();
import "express-async-errors"
import cookieParser from 'cookie-parser';

// Make sure cookie-parser middleware is used
app.use(cookieParser());

// Example to log cookies
// console.log('Cookies:', req.cookies);



app.use('/uploads', express.static('uploads'))

//!!!!env config
import dotenv from 'dotenv'
dotenv.config()



//!!!! connect database
import Connectdb from './config/db.js';
Connectdb();

//! middleware cors 
import cors from 'cors';

app.use(cors({
    origin:[process.env.Frontend_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH', 'OPTIONS'], // Allow these methods
    credentials:true
}));
import morgan from 'morgan';
app.use(morgan("dev"));

//!!!!1middleware hai when we receive json data then we need to inform the application that 
// !! we use json data so it deal with json data 
app.use(express.json()); 
app.use(express.urlencoded({extended:true}))


//???Security package 
import helmet from 'helmet'
app.use(helmet())  // this is for header security 
import xss from 'xss-clean'
app.use(xss())
import mongoSanitize from 'express-mongo-sanitize'  //mongo db security package 
app.use(mongoSanitize());

//???



//???import routtes file 

import registerroutes from './routes/registerroute.js'
import jobsroute from './routes/jobsroute.js'
import errormiddleware from './middleware/errormiddleware.js';
import applicationroute from './routes/applicationroute.js' 

//!!!!    routing 
app.use('/api/v1/reg', registerroutes)  // this is for registration login logout 
app.use('/api/v1/job', jobsroute); // job  
app.use("/api/v1/application",applicationroute);



app.use(errormiddleware);


// !!!!!!Server
const Port= process.env.PORT||4000
app.listen(Port, ()=>{
    console.log(`Node server is running in ${process.env.Dev_mode} on port no ${Port}`)
})