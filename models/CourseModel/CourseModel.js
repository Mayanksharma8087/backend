const  mongoose = require("mongoose");

const courseModel = mongoose.Schema({
  id: {
    type:mongoose.Types.ObjectId,
  },
  image: {
    type: String,
    required: [true, "Select image"],
  },
  name: {
    type: String,
    required: [true, "please Enter your name"],
  },
  author: {
    type: String,
    required: [true, "please Enter your author"],
  },
  description: {
    type: String,
    required: [true, "please Enter your description"],
  },
  price:{
    type:Number,
    required:[true,'please enter course price']
  }
});

const CourseModel = mongoose.model("coursedetails", courseModel);
module.exports = CourseModel;
