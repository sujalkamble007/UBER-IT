const userModel = require('../models/user.model');

module.exports.createUser = async({ firstname, lastname, email, password }) => {
    if(!firstname || !email || !password){
        throw new Error('Missing required fields');
    }
    try{
    const user = await userModel.create({
        fullname: {firstname, lastname}, 
        email, 
        password
    });
    return user;
    }catch(error){
        console.log("Error creating user",error);
        throw error;
    }
}
