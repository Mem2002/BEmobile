const User = require("../models/User");
const express = require("express");
const UserTestModels = require("../models/UserTest");
const bcrypt = require("bcryptjs");
const session = require('express-session');
const mongoose = require("mongoose")
const MongoDBSession = require('connect-mongodb-session')(session);
const router = express.Router();


// const mongoURI = 'mongodb+srv://namanh030802:Mem%40%40382002@fptmobile.hgqhsmu.mongodb.net/BEmobile'; // port => hardcode . uat .prod

// mongoose
//   .connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then((res) => {
//     console.log("MongoDB Connected");
//   })
//   .catch((err) => {
//     console.error("MongoDB Connection Error:", err);
//   });

//   const store = new MongoDBSession({
//     uri: mongoURI,
//     collection: "Mysessions",
//   });

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
  return res.render("homePage.ejs", {
    listUsers: results,
  });
};

const listUser = [
  {
    id: 1,
    name: 'chi pheo',
    author: 'ABC'
  },
  {
    id: 2,
    name: 'Chiến tranh và hoa binh',
    author: 'DEF'
  },
];

const getbooks = (req, res) =>{
  res.json({status: 'Success', data: listUser})
}


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
  res.render("login.ejs"); // tạo ra 1 view động
};
const getregister = async (req, res) => {
  res.render("register.ejs"); // tạo ra 1 view động
};

const postlogin = async (req, res) => {
  // res.render("login.ejs"); // tạo ra 1 view động
  const { email, password } = req.body;
  const user = await UserTestModels.findOne({ email });

  // if (!req.session.views) {
  //   req.session.views = 1;
  // } else {
  //   req.session.views++;
  // }
  // res.send(`Number of views: ${req.session.views}`);

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
  
  await user.save();
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
  res.redirect("/");
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
  res.redirect("/");
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
