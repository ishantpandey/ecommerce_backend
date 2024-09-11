const express=require('express')
const router=express.Router()
const { authUser, isAdmin } = require('../authMiddleware/authentication')
const {createCategory,
      updateCategory,
      deleteCategory,
      AllCategory,
      singleCategory} = require('../controller/categoryController')


router.post('/create-category',authUser,isAdmin,createCategory)
router.put('/update-category/:id',authUser,isAdmin,updateCategory)
router.delete('/delete-category/:id',authUser,isAdmin,deleteCategory)
router.get('/allcategories',AllCategory)
router.get('/single-category/:slug',singleCategory)

module.exports=router;