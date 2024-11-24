import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },


});

const userModel = mongoose.model("Users",UserSchema);

export default userModel;
