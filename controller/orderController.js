const OrderModel = require('../models/orderModel')
const instance = require('../service/intance')
require('dotenv').config()
const crypto = require('crypto')

const getkey=async(req,res)=>{
return res.send({key:process.env.RAZORPAY_API_KEY})
}

const checkout=async(req,res)=>{
    const options = {
        amount: Number(req.body.amount*100),  // amount in the smallest currency unit
        currency: "INR",        
      };
     
      const order = await instance.orders.create(options) 

       return res.send({
            order
          })        
}

const paymentvarification=async(req,res)=>{
 const {razorpay_payment_id,razorpay_signature,razorpay_order_id,userid,cart,address}=req.body;
const body = razorpay_order_id + "|" + razorpay_payment_id;
const expectedSignature = crypto.createHmac('sha256',process.env.RAZORPAY_API_SECRET)
                            .update(body.toString())
                            .digest('hex');
                           
                         
 const response = razorpay_signature==expectedSignature
 if(response){
 
 await new OrderModel({
  products:cart,
  orderid:razorpay_order_id,
  paymentid:razorpay_payment_id,
  paysignatureid:razorpay_signature,
  buyer:userid,
  address:address
 }).save()
 res.status(200),send({success:true})
 }
 else{
  return res.status(400).send({
    success:false,
    
  })
 }
 return res.send({
    success:true,
    
  })
}

const userOrder=async(req,res)=>{
  
  
  if(req.params.orderStatus=="All Orders"){
    const order = await OrderModel.find({buyer:req.user.id},{paysignatureid:0}).populate("products","-photo").sort({createdAt:-1})
    res.status(200).send({
      success:true,
      order
    })
  }
  else{
    const order = await OrderModel.find({$and:[{buyer:req.user.id},{status:req.params.orderStatus},]},{paysignatureid:0}).populate("products","-photo").sort({createdAt:-1})
    res.status(200).send({
      success:true,
      order
    })
  }
  
 
  console.log(req.params.orderStatus);
}

const cancelOrders=async(req,res)=>{
  await OrderModel.updateOne({$and:[{buyer:req.user.id},{_id:req.params.oid}]},{$set:{status:'Cancelled'}})
  
  res.send({success:true})
}

module.exports={checkout,paymentvarification,getkey,userOrder,cancelOrders}