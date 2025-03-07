const userModel = require('../models/user.model');
const userSevice = require('../services/user.service');
const { validationResult } = require('express-validator');



module.exports.registerUser=async(req,res )=>{
    
const errors=validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
}
console.log(req.body);
const {fullname,email,password}=req.body;

const hashedPassword=await userModel.hashPassword(password);

try{
const user =await userSevice.createUser({
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password:hashedPassword
});

const token=user.generateAuthToken();

res.status(201).json({token,user});
}catch(error){
    console.error("Error during registration:", error);
        res.status(500).json({ error: "Registration failed" });
}


}