const User = require("../models/User");
const express = require("express");
const adminModels = require("../models/UserM");
const userModels = require("../models/AdminM");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoDBSession = require("connect-mongodb-session")(session);
const router = express.Router();
const validateRegister = require("../services/registerLoginService");
const JWTaction = require("../middleware/jwtAction");

// router.use(
//   session({
//     secret: "Key that will sign cookie",
//     resave: false,
//     saveUninitialized: false,
//     // store: store,
//   })
// );

const getHomePage = async (req, res) => {
  // process data
  // call model
  let results = await User.find({});
  // req.session.isAuth = true;
  return res.render("homePage.ejs", {
    listUsers: results,
  });
};

const listUser = [
  {
    id: 1,
    name: "chi pheo",
    author: "ABC",
  },
  {
    id: 2,
    name: "Chiến tranh và hoa binh",
    author: "DEF",
  },
];

const getbooks = (req, res) => {
  res.json({ status: "Success", data: listUser });
};

const getListUser = async (req, res) => {
  let results = await User.find({});
  // req.session.isAuth = true;
  req.session.loggedIn = true;
  return res.render("listUser.ejs", {
    listUsers: results,
  });
};

const getloginUser = async (req, res) => {
  let message = req.query.message;
  res.render("loginUser.ejs", { message: message });
};

const postLoginUser = async (req, res) => {
  const { email, password } = req.body;

  let isUsernameExists = await validateRegister.checkEmail(req.body.email);
  if (isUsernameExists == false) {
    let message = "Please enter correct email or password";
    return res.redirect(`/loginUser?message=${encodeURIComponent(message)}`);
  }

  if (!validateRegister.isPasswordStrong(req.body.password)) {
    let message = "Please enter correct email or password";
    return res.redirect(`/loginUser?message=${encodeURIComponent(message)}`);
  }

  let user = await adminModels.findOne({ email });
  if (user) {
    let IsCorrectPass = checkPassword(req.body.password, user.password);
    if (IsCorrectPass === true) {
      let tokenJWT = await JWTaction.createJWT({
        id: user._id,
        email: user.email,
      });
      res.cookie("jwt", tokenJWT, {
        maxAge: 60 * 60 * 1000, // set time for cookie
        httpOnly: true, // only use from server
      });
      // req.session.isAuth = true;
      req.session.loggedIn = true;
      res.redirect("/listUser");
      console.log("login success");
    }
  }
  if (!user) {
    let message = "Not found user";
    return res.redirect(`/loginUser?message=${encodeURIComponent(message)}`);
  }
};

const getLoginAdmin = async (req, res) => {
  let message = req.query.message;
  res.render("loginAdmin.ejs", { message: message });
};

const getRegisterUser = async (req, res) => {
  res.render("registerUser.ejs");
};

const postRegisterUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    let message = "Please fill in all fields.";
    return res.redirect(
      `/registerAdmin?message=${encodeURIComponent(message)}`
    );
  }
  let isEmailExists = await validateRegister.checkUsername(req.body.username);
  if (isEmailExists == true) {
    // console.log("The username already exists");
    let message = "The username already exists.";
    return res.redirect(
      `/registerAdmin?message=${encodeURIComponent(message)}`
    );
  }
  let isUsernameExists = await validateRegister.checkEmail(req.body.email);
  if (isUsernameExists == true) {
    // console.log("The email already exists");
    let message = "The email already exists.";
    return res.redirect(
      `/registerAdmin?message=${encodeURIComponent(message)}`
    );
  }

  if (!validateRegister.isPasswordStrong(req.body.password)) {
    let message =
      "Password needs 1 uppercase letter, 1 special character, 1 digit, and minimum 8 characters.";
    return res.redirect(
      `/registerAdmin?message=${encodeURIComponent(message)}`
    );
  }

  let user = await userModels.findOne({ email });

  if (user) {
    return res.redirect("/registerUser");
  }

  const hashedPsw = await bcrypt.hash(password, 12);
  user = new userModels({
    username,
    email,
    password: hashedPsw,
  });

  const a = await user.save();
  console.log(a);
  // req.session.isAuth = true;
  res.redirect("/loginUser");
};

const getRegisterAdmin = async (req, res) => {
  let message = req.query.message;
  res.render("registerAdmin.ejs", { message: message });
};

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
};

const postLoginAdmin = async (req, res) => {
  const { email, password } = req.body;

  let isUsernameExists = await validateRegister.checkEmail(req.body.email);
  if (isUsernameExists == false) {
    let message = "Please enter correct email or password";
    return res.redirect(`/loginAdmin?message=${encodeURIComponent(message)}`);
  }

  if (!validateRegister.isPasswordStrong(req.body.password)) {
    let message = "Please enter correct email or password";
    return res.redirect(`/loginAdmin?message=${encodeURIComponent(message)}`);
  }

  let user = await adminModels.findOne({ email });
  if (user) {
    let IsCorrectPass = checkPassword(req.body.password, user.password);
    if (IsCorrectPass === true) {
      let tokenJWT = await JWTaction.createJWT({
        id: user._id,
        email: user.email,
      });
      res.cookie("jwt", tokenJWT, {
        maxAge: 60 * 60 * 1000, // set time for cookie
        httpOnly: true, // only use from server
      });
      // req.session.isAuth = true;
      req.session.loggedIn = true;
      res.redirect("/listUser");
      console.log("login success");
    }
  }
  if (!user) {
    let message = "Not found user";
    return res.redirect(`/loginAdmin?message=${encodeURIComponent(message)}`);
  }
};

const postRegisterAdmin = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    let message = "Please fill in all fields.";
    return res.redirect(
      `/registeradmin?message=${encodeURIComponent(message)}`
    );
  }
  let isEmailExists = await validateRegister.checkUsername(req.body.username);
  if (isEmailExists == true) {
    // console.log("The username already exists");
    let message = "The username already exists.";
    return res.redirect(
      `/registeradmin?message=${encodeURIComponent(message)}`
    );
  }
  let isUsernameExists = await validateRegister.checkEmail(req.body.email);
  if (isUsernameExists == true) {
    // console.log("The email already exists");
    let message = "The email already exists.";
    return res.redirect(
      `/registeradmin?message=${encodeURIComponent(message)}`
    );
  }

  if (!validateRegister.isPasswordStrong(req.body.password)) {
    let message =
      "Password needs 1 uppercase letter, 1 special character, 1 digit, and minimum 8 characters.";
    return res.redirect(`/register?message=${encodeURIComponent(message)}`);
  }
  ///////////////////

  let user = await UserTestModels.findOne({ email });

  if (user) {
    return res.redirect("/register");
  }

  const hashedPsw = await bcrypt.hash(password, 12);
  user = new UserTestModels({
    username,
    email,
    password: hashedPsw,
  });

  const a = await user.save();
  console.log(a);
  // req.session.isAuth = true;
  res.redirect("/loginAdmin");
};

// const getcookie = (req, res) => {
//   const cookies = req.cookies;
//   res.send(cookies);
// };

// const setcookie = (req, res) => {
//   res
//     .cookie("username", "tipsjavascript", {
//       // maxAge: 5*1000
//       // expires: new Date(Date.now() + 5 * 1000),
//       httpOnly: true,
//     })
//     .cookie("blog", "http://anonsytick.com", {
//       httpOnly: true,
//       secure: true,
//       //truyền tải 1 dao thức protocol http
//     });
//   res.send("SET COOKIES");
// };

// const delcookie = (req, res) => {
//   res.clearCookie("blog");
//   res.send("DEL COOKIES");
// };

const postCreateUser = async (req, res) => {
  // console.log(">>> req.body: ", req.body)
  let email = req.body.email;
  let name = req.body.name;
  let phone = req.body.phone;
  // console.log(">>> email = ", email, "name = ", name, "city = ", city);
  // c1
  await User.create({
    email: email,
    name: name,
    phone: phone,
  });
  // c2:
  // await User.create({
  //   email,
  //   name,
  //   city
  // })
  // req.session.isAuth = true;
  res.send("Create user succeed!");
};

const getCreatePage = (req, res) => {
  res.render("create.ejs");
};
const getUpdatePage = async (req, res) => {
  const userId = req.params.id; //id để params?
  // let user = await getUserById(userId);
  let user = await User.findById(userId).exec();
  // console.log(">>> req.params::", req.params, userId)
  // req.session.isAuth = true;
  res.render("edit.ejs", { userEdit: user });
};

// const getUpdatePage = async(req, res) =>{
//   const userId = req.params.id;
//   let user = await getUserById(userId);
//   res.render('edit.ejs', {userEdit: user});
// }
const postUpdateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let phone = req.body.phone;
  let userId = req.body.userId;

  await User.updateOne(
    { _id: userId },
    { email: email, name: name, phone: phone }
  );
  // req.session.isAuth = true;
  res.redirect("/listUser");
};

const postDeleteUser = async (req, res) => {
  const userId = req.params.id;
  // let user = await getUserById(userId);
  let user = await User.findById(userId).exec();
  res.render("delete.ejs", { userEdit: user });
};

const postHandleRemoveUser = async (req, res) => {
  const id = req.body.userId;
  await User.deleteOne({
    _id: id,
  });
  res.redirect("/listUser");
};
module.exports = {
  //export ra nhiều biến(object)
  getHomePage,
  getListUser,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoveUser,
  postLoginAdmin,
  postRegisterAdmin,
  getLoginAdmin,
  getRegisterAdmin,
  // getcookie,
  // setcookie,
  // delcookie,
  getbooks,
  getRegisterUser,
  postRegisterUser,
  postLoginUser,
  getloginUser,
};
