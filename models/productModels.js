const mongoose=require('mongoose')

const productShema= mongoose.Schema({
    names:{
        type:String,
        require:true
    },
    slug:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category",
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    shipping:{
        type:Boolean
    }
},{timestamps:true})

const ProductModel= new mongoose.model('Product',productShema)

module.exports=ProductModel