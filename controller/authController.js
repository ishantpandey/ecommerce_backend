const User =require('../models/userModel')
const{encryptedpassword,decryptedpassword}=require('../service/encryptpassword')
const {signUser}=require('../service/jwtVarification')

//--------------------Registration----------------
const register=async(req,res)=>{
 try {
    const {names,email,phone,password,address,answer}=req.body;
    const existEmail=await User.findOne({email})
    if(existEmail){
        return res.status(200).send({success:false,msg:'email already exist'})
    }
    const hasedpassword=await encryptedpassword(password)
   
 const user=await User({names,email,phone,password:hasedpassword,address,answer});
 await user.save();
 res.send(user)
 } catch (error) {
  res.status(500).send({
   success:false,
   msg:'false',
   error
  })
 }
}
//---------------------------Login---------------------
const login=async(req,res)=>{
    try {
       
        const {email,password}=req.body;
    const userData= await User.findOne({email})
  
    const comparepassword= await decryptedpassword(password,userData.password)
    if(comparepassword){
        const token=await signUser(userData)
        console.log(token);
        return  res.status(200).json({
         success: true,
          msg: "true",
          user:{
            id:userData._id,
            name:userData.names,
            email:userData.email,
            phone:userData.phone,
            address:userData.address,
            role:userData.role
          },
          token:token
         })
          
        }
    else{
        res.status(200).send('check details')
    }
    } catch (error) {
        res.status(500).send({
            success:false,
            msg:'please check your input',
            error
           })  
    }
}
//------------------------Forget password-------------

const forgetPassword=async(req,res)=>{
    const{email,answer,newpassword}=req.body
    const hashed=await encryptedpassword(newpassword)
  
    try {
        const checkUser=await User.findOne({email,answer})
        if(checkUser){
            const updatePassword=await User.findByIdAndUpdate(checkUser._id,{password:hashed})
            res.status(200).send({success:true,msg:"update password"})
        }
        else{
            res.status(200).send({success:flase,msg:"Please check input"}) 
        }
    } catch (error) {
        res.status(500).send({
            success:false,
            msg:'please check your input',
            error   
    })
}
}
const updateUserData=async(req,res)=>{
    const{name,email,address,phone}=req.body
  const user =  await User.updateOne({_id:req.user.id},{$set:{name,email,address,phone}})

res.send({success:true,user:req.body})
}

module.exports={register,login,forgetPassword,updateUserData}