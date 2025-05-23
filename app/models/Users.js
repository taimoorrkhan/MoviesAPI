const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    role : {
        type : String,
        default : 'user' || role
    },

    created_at : {
        type : Date,
        default : Date.now
    }
    
})

const User = mongoose.model('User', UserSchema);

module.exports = User;