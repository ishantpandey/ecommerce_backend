const ProductModel = require('../models/productModels')
const CategoryData = require('../models/categoryModel')
const fs=require('fs')
const slugify =require('slugify') 
require('dotenv').config()


 

//------------------------------Create Category-------------------
const createProduct=async(req,res)=>{
   
   try {
      const {names,slug,description,price,category,quantity,shipping}=req.fields
    const {photo}=req.files;
   
   const product=new ProductModel({...req.fields,slug:slugify(names)})
  
   if(photo){
   
      product.photo.data=fs.readFileSync(photo.path)
     
      product.photo.contentType=photo.type

      await product.save();
   
      res.status(200).send({success:true,msg:'product created',product})

   }
   else{
      return res.status(200).send({success:false,msg:'something goes wrong'})
   }
   } catch (error) {
    res.status(500).send({success:false,msg:'server problem',error})
   }
}
//----------------------------Update Category------------------------
const updateProduct=async(req,res)=>{
   try {
      const {names,slug,description,price,category,quantity,shipping}=req.fields
    const{photo}=req.files;
   const product= await ProductModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(names)})
   if(photo){
      product.photo.data=fs.readFileSync(photo.path)
      product.photo.contentType=photo.type
     
   }
   await product.save();
   res.status(200).send({success:true,msg:'product updated',product})

  
   } catch (error) {
    res.status(500).send({success:false,msg:'server problem',error})
   }
}
//--------------------All category--------------
const AllProduct=async(req,res)=>{
   
   try {
      const product = await ProductModel.find({}).select("-photo").populate("category")
      if(product){
         res.status(200).send({success:true,msg:"all product",product})
      }
      else{
         return res.status(200).send({success:false,msg:'something goes wrong'})
      }
   
   } catch (error) {
      res.status(500).send({success:false,msg:'server problem',error})
   }
}
//-------------------Single Category--------------------
const singleProduct=async(req,res)=>{
   const {slug}=req.params
  
   try {
    const result = await ProductModel.findOne({slug}).select("-photo").populate("category");
    if(result){
        return res.status(200).send({success:true,msg:'single product',result})
    }
    else{
        return res.status(200).send({success:false,msg:'something goes wrong'})
    }
   } catch (error) {
    return res.status(500).send({success:false,msg:'server error',error})
   }
}
//--------------------------Delete Category------------------
const deleteProduct=async(req,res)=>{
    try {
      try {
   
         const product= await ProductModel.findByIdAndDelete(req.params.pid).select("-photo")
         if(product){
           return res.status(200).send({success:true,msg:"product deleted"})
         }
         else{
           return res.status(200).send({success:false,msg:'something goes wrong'})
       }
     } catch (error) {
        return res.status(500).send({success:false,msg:'server error',error})
     }
    } catch (error) {
    
    }
}
//-----------------------Get product image-----------------------
const ProductImg=async(req,res)=>{
try {
   
    const product= await ProductModel.findById(req.params.pid).select("photo")
    if(product.photo.data){
      res.set("Content-type",product.photo.contentType)
      return res.status(200).send(product.photo.data)
    }
    else{
      return res.status(200).send({success:false,msg:'something goes wrong'})
  }
} catch (error) {
   return res.status(500).send({success:false,msg:'server error',error})
}
}
//---------------product by filter-----
const FilterProduct=async(req,res)=>{
   try {
      const {radio,checked}=req.body
      const args={}

      if(checked.length>0){
         args.category=checked
      }
     
      if(radio.length){
         let arrRadio=[]
     
         arrRadio?.push(parseInt(radio.split(",")[0]))
         arrRadio?.push(parseInt(radio.split(",")[1]))
         args.price={$gte:arrRadio[0],$lte:arrRadio[1]}
      }
      const product = await ProductModel.find(args)
      if(product){
         res.status(200).send({success:true,msg:"all product",product})
      }
      else{
         return res.status(200).send({success:false,msg:'something goes wrong'})
      }
   
   } catch (error) {
      res.status(500).send({success:false,msg:'server problem',error})
   }  
}
//----------------------product count----------------------

const ProductCount=async(req,res)=>{
   try {
      const total = await ProductModel.find({}).estimatedDocumentCount()
      res.status(200).send({success:true,msg:"total product",total})
   } catch (error) {
      res.status(500).send({success:false,msg:'server problem',error})
   }
}
//-----product list per Page

const productList=async(req,res)=>{
try {
   const perpage=4
   const page = req.params.page ? req.params.page : 1
   const product = await ProductModel.find({})
   .select("-photo")
   .skip((page-1)*perpage)
   .limit(perpage)
   .sort({createdAt:-1})
   res.status(200).send({success:true,msg:"total product",product})
} catch (error) {
   res.status(500).send({success:false,msg:'server problem',error})  
}
}
//-------------Search Product-----------------

const serachProduct=async(req,res)=>{
   try {
      console.log('search');
      const{keyword}=req.params
      
      const product = await ProductModel.find({
         $or: [
            {names:{$regex:keyword , $options:"i"}}
            
         ]
      }).select("-photo")
      console.log(keyword);
      res.status(200).send(product)
   } catch (error) {
      res.status(500).send({success:false,msg:'server problem',error})   
   }
}
//------------------related product-----------------
const relatedProduct=async(req,res)=>{
try {
   const {categoryid}=req.params
   console.log(categoryid);
   const product = await ProductModel.find({category:categoryid}).select("-photo").populate("category")
   console.log(product);
   res.status(200).send(product)
} catch (error) {
   res.status(500).send({success:false,msg:'server problem',error})   
}
}
//-----------------Product by category-------------
const byCategory=async(req,res)=>{
   try {
      const {slug}=req.params
   
      const categoryid = await CategoryData.find({slug})
      const product = await ProductModel.find({category:categoryid}).select("-photo").populate("category")
     
      res.status(200).send(product)
   } catch (error) {
      res.status(500).send({success:false,msg:'server problem',error})   
   }
}



module.exports={createProduct,updateProduct,deleteProduct,AllProduct,singleProduct,ProductImg,FilterProduct,ProductCount,productList,serachProduct,relatedProduct,byCategory};