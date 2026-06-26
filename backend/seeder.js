const mongoose =require("mongoose");
const dotenv =require("dotenv");
dotenv.config()

const Product=require("./models/Product");
const products=require("./Data/productsSeed");
const Cart=require("./models/Cart");

const User=require("./models/User");

//CONNECT TO mongo db
mongoose.connect(process.env.MONGO_URI);

//function to seed data

const seedData=async()=>{
    try {
       // clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();


        //create a default admin
        const createdUser=await User.create({
            name:"Admin User",
            email:"admin@example.com",
            password:123456,
            role:"admin"
        });

        //assign the default UserId to each product
        const userId=createdUser._id;

        const sampleProducts=products.map((product)=>{
            return {...product,user:userId};
        })

        //insert the product inti database

        await Product.insertMany(sampleProducts);
        console.log("product data seeded successfully");
        
    } catch (err) {
        console.error("Error seeding the data:",err);
    }
};

seedData();
