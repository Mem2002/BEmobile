const User = require("../models/User");

const getUsersAPI = async (req, res) => {
  let results = await User.find({});
  return res.status(200).json({
        // mã lỗi để hiển thị 1 cách linh động
    errorCode: 0,
    data: results,
  });
};
module.exports = {
  getUsersAPI,
};
