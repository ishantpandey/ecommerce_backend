const jwt=require('jsonwebtoken')

const signUser=async(user)=>{
   return jwt.sign({
    id:user._id,
    name:user.name,
    email:user.email
   }, process.env.SECRET
)
  
}

const varifyUser=async(token)=>{
    return jwt.verify(token, process.env.SECRET
    )
}
module.exports={signUser,varifyUser}