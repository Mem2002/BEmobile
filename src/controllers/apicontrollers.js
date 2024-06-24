const User = require("../models/User");
const validateRegister = require("../services/registerLoginService");
const bcrypt = require("bcrypt");
// const UserTestModels = require("../models/AdminM");
const JWTaction = require("../middleware/jwtAction");
const AdminM = require("../models/AdminM");

//---------------- Login ------------------
//check lengthen of password
const isPasswordLength = (password) => {
  return password.length >= 8;
};

const checkPassword = (inputPassword, hashPassword) => {
  if (!inputPassword || !hashPassword) {
    throw new Error("Input password and hash password are required");
  }
  return bcrypt.compareSync(inputPassword, hashPassword);
};

const postregister = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      EM: "Missing data required",
      EC: "1",
      DT: "",
    });
  }

  let isUsernameExists = await validateRegister.checkEmail(req.body.email);
  if (isUsernameExists == true) {
    // console.log("The email already exists");
    return res.status(400).json({
      EM: "The email already exists",
      EC: "1",
      DT: "",
    });
  }

  if (!validateRegister.isPasswordStrong(req.body.password)) {
    return res.status(400).json({
      EM: "Password needs 1 uppercase letter, 1 special character, 1 digit, and minimum 8 characters.", //error message
      EC: "1", //error code
      DT: "", //data
    });
  }
  // if (user) {
  //   return res.redirect("/register");
  // }

  const hashedPsw = await bcrypt.hash(password, 12);
  user = new User({
    username,
    email,
    password: hashedPsw,
  });

  const a = await user.save();
  console.log(a);
  return res.status(200).json({
    EM: "User created successfully", //error message
    EC: "0", //error code
    DT: a, //data
  });
  // req.session.isAuth = true;
  // res.redirect("/login");
};

const postlogin = async (req, res) => {
  const { email, password } = req.body;

  let isUsernameExists = await validateRegister.checkEmail(req.body.email);
  if (isUsernameExists == false) {
    let message = "Please enter correct email or password";
    return res.status(400).json({
      EM: message, //error message
      EC: "1", //error code
    });
  }

  if (!validateRegister.isPasswordStrong(req.body.password)) {
    let message = "Please enter correct email or password";
    return res.status(400).json({
      EM: message, //error message
      EC: "1", //error code
    });
  }

  let user = await AdminM.findOne({ email });
  if (user) {
    if (!user.password) {
      return res.status(500).json({
        EM: "Server error: User password is missing",
        EC: "1",
      });
    }

    let isCorrectPass = checkPassword(req.body.password, user.password);
    if (isCorrectPass === true) {
      let tokenJWT = await JWTaction.createJWT({
        id: user._id,
        email: user.email,
      });
      res.cookie("jwt", tokenJWT, {
        maxAge: 60 * 60 * 1000, // set time for cookie
        httpOnly: true, // only use from server
      });
      req.session.loggedIn = true;
      return res.status(200).json({
        EM: "Login successfully",
      });
    } else {
      return res.status(400).json({
        EM: "Incorrect password",
        EC: "1",
      });
    }
  } else {
    return res.status(404).json({
      EM: "Not found user",
      EC: "-1",
    });
  }
};

const getUsersAPI = async (req, res) => {
  try {
    console.log(req.cookies);

    // Kiểm tra cookie jwt
    if (!req.cookies || !req.cookies.jwt) {
      return res.status(401).json({
        EC: 1,
        EM: "Not authorized. No token found",
      });
    }

    // Tìm tất cả người dùng và loại bỏ trường password
    let results = await User.find({}).select("-password");

    // Trả về dữ liệu người dùng
    return res.status(200).json({
      EC: 0,
      data: results,
    });
  } catch (error) {
    // Xử lý lỗi
    return res.status(500).json({
      EC: -1,
      EM: "Error fetching users",
    });
  }
};
const postCreateUserAPI = async (req, res) => {
  // console.log(">>> req.body: ", req.body)
  let email = req.body.email;
  let name = req.body.name;
  let phone = req.body.phone;
  let user = await User.create({
    email: email,
    name: name,
    phone: phone,
  });
  return res.status(200).json({
    EC: 0,
    data: user,
  });
};
const putUpdateUserAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let phone = req.body.phone;
  let userId = req.body.userId;

  let user = await User.updateOne(
    { _id: userId },
    { email: email, name: name, phone: phone }
  );
  return res.status(200).json({
    EC: 0,
    data: user,
  });
};
const deleteUserAPI = async (req, res) => {
  const id = req.body.userId;
  let results = await User.deleteOne({
    _id: id,
  });
  return res.status(200).json({
    EC: 0,
    data: results,
  });
};

const getUsersPayslipAPI = async (req, res) => {
  try {
    let results = await User.find({}).select("-password"); // Loại bỏ trường password
    return res.status(200).json({
      EC: 0,
      data: results,
    });
  } catch (error) {
    return res.status(500).json({
      EC: -1,
      message: "Error fetching users",
    });
  }
};
module.exports = {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postregister,
  postlogin,
  getUsersPayslipAPI,
};
