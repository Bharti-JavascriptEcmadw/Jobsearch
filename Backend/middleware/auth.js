import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const auth = async (req, res, next) => {
    const token= req.cookies.token; // Or wherever your token is stored

   console.log(`this is the token which i get ${token}`)

    if (!token) {
        console.log(!token)
        
        return res.status(401).json({ error: 'Token is missing or empty' });
    }

    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET);
        console.log(payload)
        // req.user = { userID: payload.userID };user
        // !! yaha userId islyea ayega kuki user model me jwt token create sign kyia 
        // !! tab waha par humne user id ko userID variable me store kyia hai 
        req.user=await userModel.findById(payload.userID)
        console.log(`whole user console  ${req.user}`)
        
        console.log(payload.userID);
        
        const userID=payload.userID;
        console.log(userID)

        
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(401).json({ error: 'User is not authorized' });
        }
};
;
export default auth;



// !!! is code ko tab put karenge jab hume header se token bhejna ho aur 
// !!! cookies me token sotre nahi karna hao tab 
    // const authHeader = req.headers.authorization;

    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //     return res.status(401).json({ error: 'Authorization header missing or incorrect format' });
    // }

    // const token = authHeader.split(' ')[1];