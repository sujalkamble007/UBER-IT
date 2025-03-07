const mongoose =require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');


const userschema=new mongoose.Schema({
    fullname:{
    firstname:{
        type:String,
        required:true,
        minlength:[3,'First name must atleast be 3 characters long '],
    },
    lastname:{
        type:String,
    
        minlength:[3,'Last name must atleast be 3 characters long '],
    },
},
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:[6,'Password must atleast be 6 characters long '],
        select:false, //dons't show the password when we get the user
    },
    socketId:{
        type:String,
        // required:true,
    },

})
userschema.methods.generateAuthToken=function(){
    const token=jwt.sign(({_id:this._id}),process.env.JWT_SECRET);
    return token;
}

userschema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userschema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}

const userModel=mongoose.model('User',userschema);
module.exports=userModel;