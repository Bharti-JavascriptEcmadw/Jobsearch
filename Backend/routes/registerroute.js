        import express from 'express'
        
        import  { registercontroller,loginController, logoutController, getUser,} from '../controller/registercontroller.js'
import auth from '../middleware/auth.js'

        const router =express.Router()
        router.post('/register',registercontroller)
        router.post('/login', loginController)
        router.get('/logout',auth, logoutController)
        router.get('/getuser',auth, getUser)




        export default router;  


        //!! this is registration login and lgout api whihc is for both jobseeker and employer