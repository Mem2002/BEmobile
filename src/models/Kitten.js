const mongoose = require("mongoose");

//shape data
const kittySchema = new mongoose.Schema({
  //create  Schema mongooDB Kitty
  name: String,
});

//create database
const Kitten = mongoose.model("eric", kittySchema);
module.exports = Kitten; //Kitten là một tên object tượng trưng cho data lưu trữ
