import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken';
//schema
const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:[true, "Name is required "]
},
lastName: {
    type:String
},
email:  {
    type:String,
    required:[true,'email is  required'],
    unique:true,
    validate:[validator.isEmail, "Please provide a valid email"]
},
password:{
    type:String,
    required:[true,'password is required '],
    select:true
},
phone:{
    type:Number,
    // required:[true, "please provide phone number"]
},
role:{
    type:String,
    required:[true, "please provide your role"],
    enum:['Job seeker', 'Employer']
},

},
{timestamps:true}
);



//!!middleware   bcrypt  pasword hashing 
userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt =await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password, salt);
}
);


userSchema.methods.comparePassword= async function(userPassword){
    const isMatch=await bcrypt.compare(userPassword, this.password);
    return isMatch;

}

//? create token
userSchema.methods.createJWT=function(){
    return JWT.sign({userID:this._id},process.env.JWT_SECRET,{expiresIn:'2d'}
    )
}
export default mongoose.model("User", userSchema)
