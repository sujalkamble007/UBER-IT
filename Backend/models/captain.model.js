const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength: [3, 'First Name must be at least 3 characters long'],
        },
        lastname:{
            type: String,
            required: true,
            minlength: [3, 'Last Name must be at least 3 characters long'],
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Invalid Email']
    },
    password:{
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false,
    },
    socketId:{
        type: String,
        default: null,
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long'],
        },
        plate:{
            type: String,
            required: true,
            minlength: [6, 'Plate must be at least 6 characters long'],
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vehicleType:{
            enum: ['car', 'motorcycle','auto'],
            type: String,
            required: true,
        }
    },
    location:{
        lat:{
            type: Number,
           
        },
        lng:{
            type: Number,
        }
    }
})

captainSchema.methods.generateAuthToken = function(){
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}
captainSchema.methods.comparePassword = async function(password){    
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const captainModel= mongoose.model('captain', captainSchema);
module.exports = captainModel;