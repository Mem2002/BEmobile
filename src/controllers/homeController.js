const User = require("../models/User");
const express = require("express");
const UserTestModels = require("../models/UserTest");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoDBSession = require("connect-mongodb-session")(session);
const router = express.Router();
const validateRegister = require("../services/registerLoginService");

router.use(
  session({
    secret: "Key that will sign cookie",
    resave: false,
    saveUninitialized: false,
    // store: store,
  })
);

const getHomePage = async (req, res) => {
  // process data
  // call model
  let results = await User.find({});
  req.session.isAuth = true;
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
  // process data
  // call model
  let results = await User.find({});
  // req.session.isAuth = true;
  // console.log(req.session);
  // console.log(req.session.id);
  // req.session.isAuth = false;
  req.session.isAuth = true;

  return res.render("listUser.ejs", {
    listUsers: results,
  });
};

const getABC = (req, res) => {
  // nếu mà ta định nghĩa 1 cái hàm đơn lẻ không trong cái web.js kia thì ta sẽ khong có hai biến req và res
  res.send("get ABC");
};
const getHoiDanIT = (req, res) => {
  // res.send("1111111111 vs Nam Anh");
  res.render("sample.ejs"); // tạo ra 1 view động
};
const getlogin = async (req, res) => {
  let message = req.query.message;
  res.render("login.ejs", { message: message });
};
const getregister = async (req, res) => {
  let message = req.query.message;
  res.render("register.ejs", { message: message });
};

const postlogin = async (req, res) => {
  // res.render("login.ejs"); // tạo ra 1 view động
  const { email, password } = req.body;

  let isUsernameExists = await validateRegister.checkEmail(req.body.email);
  if (isUsernameExists == false) {
    // console.log("The email already exists");
    let message = "Please enter correct email or password";
    return res.redirect(`/register?message=${encodeURIComponent(message)}`);
  }

  if (!validateRegister.isPasswordStrong(req.body.password)) {
    let message =
      "Please enter correct email or password";
    return res.redirect(`/register?message=${encodeURIComponent(message)}`);
  }

  const user = await UserTestModels.findOne({ email });

  if (!user) {
    return res.redirect("/login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.redirect("/login");
  }
  req.session.isAuth = true;
  res.redirect("/listUser");
};

const postregister = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    let message = "Please fill in all fields.";
    return res.redirect(`/register?message=${encodeURIComponent(message)}`);
  }
  let isEmailExists = await validateRegister.checkUsername(req.body.username);
  if (isEmailExists == true) {
    // console.log("The username already exists");
    let message = "The username already exists.";
    return res.redirect(`/register?message=${encodeURIComponent(message)}`);
  }
  let isUsernameExists = await validateRegister.checkEmail(req.body.email);
  if (isUsernameExists == true) {
    // console.log("The email already exists");
    let message = "The email already exists.";
    return res.redirect(`/register?message=${encodeURIComponent(message)}`);
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
  req.session.isAuth = true;
  res.redirect("/login");
};

const getcookie = (req, res) => {
  const cookies = req.cookies;
  res.send(cookies);
};

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

const delcookie = (req, res) => {
  res.clearCookie("blog");
  res.send("DEL COOKIES");
};

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
  req.session.isAuth = true;
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
  req.session.isAuth = true;
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
  req.session.isAuth = true;
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
  getABC,
  getHoiDanIT,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoveUser,
  postlogin,
  postregister,
  getlogin,
  getregister,
  getcookie,
  // setcookie,
  delcookie,
  getbooks,
};
