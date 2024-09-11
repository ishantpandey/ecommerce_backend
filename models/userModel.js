const mongoose=require('mongoose')
const { trim } = require('validator')

const userSchema= new mongoose.Schema({
    names:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:String,
        require:true,
        
    },
    password:{
        type:String,
        require:true,
        
    },
   
    address:{
        type:String,
        require:true,
        
    },
    answer:{
        type:String,
        require:true
    },
    role:{
        type:Number,
        default:0
    }
},{timestamps:true})

const User = new mongoose.model('users',userSchema)
module.exports=User