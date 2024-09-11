const jwt=require('jsonwebtoken');
const { varifyUser } = require('../service/jwtVarification');
const User = require('../models/userModel');


const authUser=async(req,res,next)=>{
  const token=req.headers.authorization ;
  if(!token){
  
    res.send({msg:'there is no token'})
  }
  const user= await varifyUser(token)
  if(!user){
    res.send({msg:' token not varified'})
  }

  req.user=user;
  
  next();
}

const isAdmin=async(req,res,next)=>{
try {
  const userRole= await User.findById(req.user.id)
  
  if(userRole.role !== 1){
    res.status(401).send({sucsess:false,
      msg:'unauthorised'
    })
  }
  else{
   
    next()
  }
} catch (error) {
  res.status(401).send(error)
}
}
module.exports={authUser,isAdmin}

