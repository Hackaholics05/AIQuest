const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    bio:{
        type:String,
    },
    avatar:{
        type:String,
        default:''
    },
    joinedat:{
        type:Date,  
        default:Date.now
    },
    
})

const UserModel = mongoose.model("User", userschema);

module.export= UserModel;