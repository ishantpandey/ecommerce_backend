const CategoryData = require("../models/categoryModel");
const slugify =require('slugify') 


//------------------------------Create Category-------------------
const createCategory=async(req,res)=>{
    const{names,img} =req.body
    
   try {
    const existCategory= await CategoryData.findOne({names})

    if(existCategory){
        return res.status(200).send({success:true,msg:'category already exist'})
    }
    else{
        const create = await new CategoryData({names,img,slug:slugify(names)}).save()
        return res.status(200).send({success:true,msg:'created'})
    }
   } catch (error) {
    return res.status(500).send({success:false,msg:'server error',error})
   }
}
//----------------------------Update Category------------------------
const updateCategory=async(req,res)=>{
    const{names} =req.body
    const {id}=req.params
   
   try {
    const result = await CategoryData.findByIdAndUpdate({_id:id},{names,slug:slugify(names)});
    if(result){
        return res.status(200).send({success:true,msg:'category update'})
    }
    else{
        return res.status(200).send({success:false,msg:'something goes wrong'})
    }
   } catch (error) {
    return res.status(500).send({success:false,msg:'server error',error})
   }
}
//--------------------All category--------------
const AllCategory=async(req,res)=>{
   
   try {
    const category = await CategoryData.find({});
    if(category){
        return res.status(200).send({success:true,msg:'All category',category})
    }
    else{
        return res.status(200).send({success:false,msg:'something goes wrong'})
    }
   } catch (error) {
    return res.status(500).send({success:true,msg:'server error',error})
   }
}
//--------------------------Delete Category------------------
const deleteCategory=async(req,res)=>{
    const {id}=req.params
   
    try {
     const result = await CategoryData.findByIdAndDelete({_id:id});
     if(result){
         return res.status(200).send({success:true,msg:'category deleted'})
     }
     else{
         return res.status(200).send({success:false,msg:'something goes wrong'})
     }
    } catch (error) {
     return res.status(500).send({success:false,msg:'server error',error})
    }
}
//-------------------Single Category--------------------
const singleCategory=async(req,res)=>{
    const {slug}=req.params
   
    try {
     const result = await CategoryData.findOne({slug});
     if(result){
         return res.status(200).send({success:true,msg:'single category',result})
     }
     else{
         return res.status(200).send({success:false,msg:'something goes wrong'})
     }
    } catch (error) {
     return res.status(500).send({success:false,msg:'server error',error})
    }
}
module.exports={createCategory,updateCategory,deleteCategory,AllCategory,singleCategory};