const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});

// securing the password with the bcrypt
userSchema.pre("save", async function(){
    console.log("pre method", this);
});
const User = new mongoose.model("User", userSchema);
module.exports = User;