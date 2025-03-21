const mongoose = require('mongoose');

const Details = new mongoose.Schema(
  {
    fullName: {
        type: String,
        required: true,
      },
    age:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    contact:{
        type:Number,
        required:true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    photo:{
        type:String,
        required:true,
    },
    idCard:{
        type:String,
        required:true,
    },
  },
  { timestamps: true }
);

const UserDetails = mongoose.model("UserDetails", Details);
module.exports = UserDetails;