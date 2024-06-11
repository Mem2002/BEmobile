const User = require("../models/UserTest");
const validateRegister = require("../services/registerLoginService");
const bcrypt = require ('bcrypt');



//---------------- Login ------------------
//check lengthen of password
const isPasswordLength = (password) => {
  return password.length >= 8;
};

const checkPassword = (inputPassword, hashPassword) => {
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
  })
  // req.session.isAuth = true;
  // res.redirect("/login");
};


const postlogin = async (req, res) => {
  const { email, password } = req.body;

  if ( !email || !password) {
    return res.status(400).json({
      EM: "Missing data required", 
      EC: "1", 
      DT: "", 
    });
  }
  let isEmailExists = await validateRegister.checkUsername(req.body.username);
  if (isEmailExists == true) {
    // console.log("The username already exists");
    return res.status(400).json({
      EM: "The username already exists", 
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
    EM: "User created successfully",
    EC: "0", //error code
    DT: a, //data
  })
  // req.session.isAuth = true;
  // res.redirect("/login");
};


const getUsersAPI = async (req, res) => {
  try {
    let results = await User.find({}).select('-password'); // Loại bỏ trường password
    return res.status(200).json({
      EC: 0,
      data: results,
    });
  } catch (error) {
    return res.status(500).json({
      EC: -1,
      message: 'Error fetching users',
    });
  }
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
const putUpdateUserAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  let userId = req.body.userId;

  let user = await User.updateOne(
    { _id: userId },
    { email: email, name: name, city: city }
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
    let results = await User.find({}).select('-password'); // Loại bỏ trường password
    return res.status(200).json({
      EC: 0,
      data: results,
    });
  } catch (error) {
    return res.status(500).json({
      EC: -1,
      message: 'Error fetching users',
    });
  }
}
module.exports = {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postregister,
  postlogin,
  getUsersPayslipAPI,
};
