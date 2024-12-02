import express from 'express';
import { employergetAllApplication, jobseekerDeleteApplication, jobseekergetAllApplication, postApplication } from '../controller/applicationcontroller.js';
const router =express.Router();
// import multer from 'multer';
import auth from '../middleware/auth.js';
// import { uploadFile } from '../middleware/uploadmiddleware.js';
// import { postApplication } from '../controller/applicationcontroller.js';
//    const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null, 'uploads')
//     },
//     filename:(req,file,cb)=>{
//         console.log(file.originalname);
//         cb(null, Date.now() + file.originalname);
//     }
//    });
// const uploadFile = multer({stoarge:storage}).single('image');

router.get('/jobseeker/getall',auth, jobseekergetAllApplication )
router.get ("/employer/getall",auth, employergetAllApplication)
router.delete('/delete/:id', auth, jobseekerDeleteApplication)
router.post('/post',auth, postApplication)

// router.post('/upload', auth, postApplication);










export default router;