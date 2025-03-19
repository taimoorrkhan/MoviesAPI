import mongoose, { Mongoose } from "mongoose";

const UserSchema  = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique
    },
    password : {
        type : String,
        required,
        minlength : 6
    },
    created_at : {
        type : Date,
        default : Date.now
    }
    
})

const User = mongoose.model('User', UserSchema);
export default User;