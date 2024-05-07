const User = require("../models/User");

const getUsersAPI = async (req, res) => {
  let results = await User.find({});
  return res.status(200).json({
    // mã lỗi để hiển thị 1 cách linh động
    EC: 0,
    data: results,
  });
};
const postCreateUserAPI = async (req, res) => {
  // console.log(">>> req.body: ", req.body)
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  let user = await User.create({
    email: email,
    name: name,
    city: city,
  });
  return res.status(200).json({
    EC: 0,
    data: user,
  });
};
module.exports = {
  getUsersAPI,
  postCreateUserAPI,
};
