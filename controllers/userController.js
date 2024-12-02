const user_model = require("../models/user_model");
const bcrypt = require("bcryptjs")

const getUserController=async(req,res)=>{
    try {
        const user=await user_model.findById({_id:req.body.id})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found"
            })
        }
        user.password=undefined;
        res.status(200).send({
            success:true,
            message:"user data got successfully",
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in get user api",
            error
        })
    }
};

const updateUserController=async(req,res)=>{
 try {
    const user=await user_model.findById({_id:req.body.id})

    if(!user){
        return res.status(404).send({
            success:false,
            message:"user not found"
        });
    }
    const { userName, address, phone } =req.body;
    if(userName) user.userName=userName;
    if(address) user.address=address;
    if(phone) user.phone=phone;
    await user.save();
    res.status(200).send({
        success:true,
        message:"user data updated successfully",
    });

 } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error in update user api",
        error
    })
 }
};


const updatePasswordController=async(req,res)=>{
    try {
        const user=await user_model.findById({_id:req.body.id})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found"
            })
        }
        const {oldPassword,newPassword}=req.body
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success:false,
                message:"old password and new password are required"
            })
        }
        const isMatch=await bcrypt.compare(oldPassword,user.password);
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"Invalid old password",
            });
        }
        var salt=bcrypt.genSaltSync(10);
        const hashedPassword=await bcrypt.hash(newPassword,salt);
        user.password=hashedPassword;
        await user.save();
        res.status(200).send({
            success:true,
            message:"password updated successfully",
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in password update api",
            error

        })
    }
};


const resetPasswordController=async (req,res)=>{
    try {
        const {email,newPassword,answer}=req.body
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success:false,
                message:"please fill all fields",
            })
        }
        const user=await user_model.findOne({email,answer})
        if(!user){
            return res.status(500).send({
                success:false,
                message:"user not found invalid answer"
            })
        }
        var salt=bcrypt.genSaltSync(10);
        const hashedPassword=await bcrypt.hash(newPassword,salt);
        user.password=hashedPassword;
        await user.save();
        res.status(200).send({
            success:true,
            message:"password reset successfully"
        });
        
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in password reset api",
            error
        })
    }
};


const deleteProfileController=async (req,res)=>{
    try {
      await user_model.findByIdAndDelete(req.params.id);
      return res.status(200).send({
        success:true,
        message:"profile deleted successfully"
      });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in delete profile api",
            error
        })
    }
};
module.exports={getUserController,updateUserController,resetPasswordController,updatePasswordController,deleteProfileController}; 