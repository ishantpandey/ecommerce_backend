const express=require('express')
const router=express.Router()
const { authUser, isAdmin } = require('../authMiddleware/authentication')
const formidable=require('express-formidable')
const {createProduct,
      updateProduct,
      deleteProduct,
      AllProduct,
      singleProduct,
      ProductImg,
      FilterProduct,
      ProductCount,
      productList,
      serachProduct,
      relatedProduct,
      byCategory,

      } = require('../controller/productController')
const braintree = require('braintree')



router.post('/create-product',authUser,isAdmin,formidable(),createProduct)
router.put('/update-product/:pid',authUser,isAdmin,formidable(),updateProduct)
router.delete('/delete-product/:pid',authUser,isAdmin,deleteProduct)
router.get('/allproduct',AllProduct)
router.get('/single-product/:slug',singleProduct)
router.get('/productimg/:pid',ProductImg)
router.post('/filter-product',FilterProduct)
router.get('/product-count',ProductCount)
router.get('/product-list/:page',productList)
router.get('/search/:keyword',serachProduct)
router.get('/related-product/:categoryid',relatedProduct)
router.get('/category-product/:slug',byCategory)



module.exports=router;