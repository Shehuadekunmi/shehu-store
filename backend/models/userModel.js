import mongoose from "mongoose";
 

const userSchema = mongoose.Schema({
    username : {
        type: String,
        requierd: true
    },

    email : {
        type: String,
        requierd: true,
        unique: true
    },

 
    password : {
        type: String,
        requierd: true
    },

    isAdmin: {
        type : Boolean,
        requierd: true,
        default: false
    }
}, {timestamps : true})


const User = mongoose.model('User', userSchema)
export default User;
