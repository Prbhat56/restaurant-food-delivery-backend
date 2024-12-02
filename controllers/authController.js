const user_model = require("../models/user_model")
const bcrypt = require("bcryptjs")
const JWT=require('jsonwebtoken')

const registerController=async(req,res)=>{
    try {
        const {userName,email,password,phone,address,answer}=req.body
        if(!userName || !email || !password || !address || !phone || !answer){
            return res.status(500).send({
                success:false,
                message:"Please fill all the fields"

            })
        }
        const existing=await user_model.findOne({email})
        if(existing){
            return res.status(500).send({
                success:false,
                message:"Email already exists please Login"
            })
        }
        var salt=bcrypt.genSaltSync(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const user=await user_model.create({userName,email,password:hashedPassword,address,phone,answer});
        res.status(201).send({
            success:true,
            message:"User created successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in register api",
            error,
        });
    }
}

const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email ||!password){
            return res.status(500).send({
                success:false,
                message:"plesae provide email and password",
            });
        }
        const user=await user_model.findOne({email:email});
        if(!user){
            return res.status(500).send({
                success:false,
                message:"user not found",
            })
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"invalid credentials",
            })
        }
        const token=JWT.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        });
        res.status(200).send({
            success:true,
            message:"login successfully",
            token,
            user
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in login api",
            error
        })
    }
}
module.exports={registerController,loginController}; 