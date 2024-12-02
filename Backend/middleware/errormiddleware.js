const errormiddleware=(err,req,res,next)=>{
    console.log(err);
    
    res.status(500).send({
        success:false,
        message:'Something went wrong',
        err,
    })


    if(err.name==="ValidationError")
    {
        defaultErrors.statusCode=500,
        defaultErrors.message=Object.values(err.errors)
        .map((item)=item.message)
        .join(",")
    }
    if(err.code&&err.code===11000){
        defaultErrors.statusCode=500,
        defaultErrors.message=`${Object.keys(
            err.keyValue
        )}`
        res.status(defaultErrors.statusCode).json({message:defaultErrors.message});
    }
}
export default errormiddleware;