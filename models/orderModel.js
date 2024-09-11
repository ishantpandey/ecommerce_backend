const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products:[{
        type:mongoose.ObjectId,
        ref:"Product"
    }],
    orderid:{
        type:String
    },
    paymentid:{
        type:String
    },
    paysignatureid:{
        type:String
    },
    buyer:{
        type:mongoose.ObjectId,
        ref:"users"
    },
  
    address:{
        type:String,
       
    },
    status:{
        type:String,
        default:"Process"
    }
},{timestamps:true})

const OrderModel = new mongoose.model('orders',orderSchema)
module.exports=OrderModel