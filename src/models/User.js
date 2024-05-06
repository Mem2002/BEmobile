const mongoose = require("mongoose");

//shape data
const userSchema = new mongoose.Schema({
  //create  Schema mongooDB Kitty
  name: String,
  email: String,
  city: String,
});

//create database
const User = mongoose.model("user", userSchema);
module.exports = User; //Kitten là một tên object tượng trưng cho data lưu trữ
