const express=require('express')
const app=express()
require('./db/db')
const cookieparser=require('cookie-parser')
const authRouter=require('./routers/authRoutes')
const categoryRouter=require('./routers/categoryRoutes')
const productRouter=require('./routers/productRoutes')
const orderRouter = require('./routers/orderRoutes')
const cors =require('cors')
require('dotenv').config()
app.use(cookieparser())
app.use(express.json())

app.use(cors({
    
    credentials: true,
    
 }))
 app.use('/auth/api',authRouter)
 app.use('/auth/api/category',categoryRouter)
 app.use('/auth/api/product',productRouter)
 app.use('/auth/api/order',orderRouter)
app.use(express.urlencoded({extended:false}))


app.listen(process.env.PORT,()=>{
    console.log('server started');
})
