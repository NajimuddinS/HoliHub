// import mongoose from "mongoose";
const mongoose = require('mongoose')

 const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MURL);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

module.exports = connectDB;