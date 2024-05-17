const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "please Enter your firstName"],
  },
  lastName: {
    type: String,
    required: [true, "please Enter your lastName"],
  },
  email: {
    type: String,
    required: [true, "please Enter your email"],
    unique: [true, "Email already in use"],
  },
  password: {
    type: String,
    required: [true, "please Enter your password"],
  },
});

const userModel = mongoose.model("user", UserSchema);
module.exports=userModel;
