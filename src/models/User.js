const mongoose = require("mongoose");

//shape data
const userSchema = new mongoose.Schema({
  //create  Schema mongooDB user
  name: String,
  email: String,
  phone: String,
});

//create database
const User = mongoose.model("user", userSchema);
module.exports = User; //Kitten là một tên object tượng trưng cho data lưu trữ
