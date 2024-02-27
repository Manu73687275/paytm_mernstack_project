const mongoose =require("mongoose");
const { string, number } = require("zod");


mongoose.connect("mongodb+srv://Manu:Manu%40123@atlascluster.s7pr6p9.mongodb.net/paytm")

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        // unique:true,
        // trim:true,
        // lowercase:true,
        // minLength:3,
        // maxLength:30
    },
    password:{
        type:String,
        required:true,
        //minLength:6
    },
    firstName:{
        type:String,
        required:true,
        // trim:true,
        // maxLength:50
    },
    lastName:{
        type:String,
        required:true,
        // trim:true,
        // maxLength:50
    }

})
const User=mongoose.model("user",userSchema);
const accountschema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    Balance:{
        type:Number,
        required:true
    }
});

const Account=mongoose.model("Account",accountschema);


module.exports ={
    User,
    Account,
}
