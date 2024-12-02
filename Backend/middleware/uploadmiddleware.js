import multer from 'multer';
// import express from 'express';
// const  app= express();

// app.use('/uploads', express.static('uploads'))

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Files will be stored in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Add a timestamp to the file name to make it unique
  },
});

// Multer middleware for single file upload
export const uploadFile = multer({ storage }).single('resume'); // Upload a single file with the field name 'resume'
