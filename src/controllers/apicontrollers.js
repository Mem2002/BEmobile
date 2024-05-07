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
const putUpdateUserAPI = async(req,res) =>{
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    let userId = req.body.userId;
  
    let user = await User.updateOne({_id: userId}, {email: email, name: name, city: city});
    return res.status(200).json({
        EC: 0,
        data: user,
      });
  }
  const deleteUserAPI = async (req, res) => {
    const id = req.body.userId;
    let results = await User.deleteOne({
      _id: id
    })
    return res.status(200).json({
        EC: 0,
        data: results,
      });
  }
module.exports = {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI
};
