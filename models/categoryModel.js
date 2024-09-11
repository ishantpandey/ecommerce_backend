const mongoose= require('mongoose')

const categorySchema=mongoose.Schema({
    names:{
        type:String,
        require:true,
        unique:true
    },
    img:{
        type:String
    },
    slug :{
        type:String,
        require:true
    }
})

const CategoryData=new mongoose.model('Category',categorySchema)
module.exports=CategoryData;