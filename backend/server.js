const express = require('express')
const{ connectDb }= require('./config/db');
const userRoutes=require("./routes/userRoutes")
const productRoutes=require("./routes/productRoutes");
const cartRoutes= require("./routes/cartRoutes");
const checkoutRoutes= require("./routes/checkoutRoutes");
const orderRoutes= require("./routes/orderRotuter");
const uploadRoutes= require("./routes/uploadRoutes");
const subscriberRoutes= require("./routes/subscriberRoutes");
const adminRoutes= require("./routes/adminRoutes");
const adminOrderRoutes= require("./routes/adminOrderRoutes");
const productAdminRoutes= require("./routes/productAdminRoutes");
const seederData=require("./seeder")
const cors =require('cors');
const dotenv = require("dotenv")
const cookieParser = require('cookie-parser');
dotenv.config()

const app = express();
const PORT = process.env.PORT;

connectDb()

const insertSeederData=async(req,res)=>{
    try {
           await seederData()
           console.log("seeder data successfully inserted");
           
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:false,msg:error.message})
        
    }
 
}
insertSeederData()

app.use(cors())
app.use(cookieParser());
app.use(express.json());




app.get('/',(req,res)=>{
    res.send('hi');
    
})


//Api routes
app.use("/api/users",userRoutes)
app.use("/api/products",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/checkout",checkoutRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/upload",uploadRoutes)
app.use("/api",subscriberRoutes)
app.use("/api/admin/users",adminRoutes)
app.use("/api/admin/products",productAdminRoutes)
app.use("/api/admin/orders",adminOrderRoutes)



app.listen(PORT,()=>{
    console.log(`my server is running at port http://localhost:${PORT}`);
    
})



