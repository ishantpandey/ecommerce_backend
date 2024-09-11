const bcrypt=require('bcrypt')

const encryptedpassword=async(password)=>{
  const hased= await bcrypt.hash(password,10)
  return hased;
}
const decryptedpassword=async(password,epassword)=>{
    const dpassword= await bcrypt.compare(password,epassword)
    return dpassword;
  }

module.exports={encryptedpassword,decryptedpassword}