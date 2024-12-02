export const sendToken=(user,statusCode,res, message)=>{
    const token=user.createJWT();
    const options={
        expires:new Date(
            Date.now()+process.env.Cookie_Expire*24*60*60*1000
        ),
        httpOnly:true,
    };
    res
    .status(statusCode)
    .cookie("user_cookie", user, options)
    .json({
        success :true, 
    user, message, token    });
};




// // 
//  for save cookie use res.cookie () method 
//   res.cookie('token', 'your_jwt_token_here', { 
//     httpOnly: true,  // यह XSS अटैक्स से बचाने में मदद करता है
//     secure: true,    // यदि HTTPS का उपयोग कर रहे हैं तो इसे true पर सेट करें
//     maxAge: 24 * 60 * 60 * 1000 // कूकी की समाप्ति का समय (1 दिन)
//   });
  
//   res.send('कूकी सेट कर दी गई है!');