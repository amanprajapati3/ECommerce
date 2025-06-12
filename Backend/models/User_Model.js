import mongoose from "mongoose";

const User_schema = new mongoose.Schema({
     name : {type: String, require : true},
     email : {type : String, require : true, unique : true},
     password : {type : String, require : true},
     cartData : {type : Object, default : {}}
}, {minimize: false})

const UserModel = mongoose.model.User_info || mongoose.model("User_info", User_schema);

export default UserModel;