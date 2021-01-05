const mongoose = require("mongoose");

let UserSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{ 
        type:String,
        required: true
    },
    avatar:{
        type:String,
    }
});

module.exports = UserSchema = mongoose.model("user", UserSchema);