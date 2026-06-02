const jwt = require('jsonwebtoken');
// const mongoose=require("mongoose");
// const dotenv=require("dotenv");
// dotenv.config()


function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];//get authorization header
    const token = authHeader && authHeader.split(" ")[1];//get token from header
    if(!token) return res.sendStatus(401);//if no token present

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(401);
        req.user=user;//attach user info to request object
        next();
    });//end of jwt.verify
}
 
// const connectToMongoDb=async()=>{
//     try {
//         await mongoose.connect(process.env.DB_URI,);
//         console.log("Connected to mongodb");
//     } catch (error) {
//         console.log("Error connecting mongodb ",error.message);
//     }
// }
module.exports={authenticateToken}; 