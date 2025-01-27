const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
   userName:{
    type: String,
    required:[true,"username is required"]
   },
   email:{
    type:String,
    required:[true,"email is required"],
    
   },
   password:{
    type:String,
    required:[true,"password is required"],
   },
   address:{
    type:Array,
   },
   phone:{
    type:String,
    required:[true,"phone number is required"]
   },
   usertype:{
    type:String,
    required:[true,"user type is required"],
    default:"client",
    enum:['client','admin','vendor','driver']
   },
   profile:{
      type:String,
      default:
         'https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg'
   },
   answer:{
      type:String,
      required:[true,"Answer is required"],
   }
},
{timestamps:true}
);

module.exports=mongoose.model("user",userSchema);