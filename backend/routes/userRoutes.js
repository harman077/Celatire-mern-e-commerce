const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
const {protect} = require("../middleware/authMiddleware")
dotenv.config()

const router =express.Router();


router.post("/register",async (req,res)=>{
    const{name,email,password}=req.body;
    try{
        let user = await User.findOne({email})
        if(user){
            return  res.status(400).send("already exist")}
        
user = new User({name,email,password})

await user.save();
// create jsonweb token

const payload ={user:{id:user._id,role:user.role}
    };

    //sign and return the token along with the user data
    jwt.sign(payload,process.env .JWT_SECRET_KEY,{expiresIn:"40h"},(err,token)=>{
        if(err)throw err;
        //send the user and token in response
        res.status(201).json({
            user:{_id:user._id,name:user.name,
                email:user.email,
                role:user.role
            },
            token,
        })
    })

}
    catch(err){
        console.log(err);
        res.status(500).send("server error");
        
    }
});
//route post/api/users/login
//desc Authnetication user
//access public

router.post("/login",async(req,res)=>{
    const {email,password} =req.body;
      
      
    try{
        let user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"user not found"});
        const isMatch =await user.comparePassword(password);

        if(!isMatch) return res.status(400).json({message:"invalid ceredentials"});



        const payload ={user:{id:user._id,role:user.role}
    };

    //sign and return the token along with the user data
    jwt.sign(payload,process.env .JWT_SECRET_KEY,{expiresIn:"40h"},(err,token)=>{
        if(err)throw err;
        //send the user and token in response
        res.status(200).json({
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            },
            token,
        })
    })

}
   
catch (err) {
console.error(err);
res.status(500).send("Server Error")

}
}
)
//route get /api/users/profile
//desc get logged in users profile (protected profile)
// access private



router.get("/profile",protect,async(req,res)=>{
    res.json(req.user)
})
module.exports=router