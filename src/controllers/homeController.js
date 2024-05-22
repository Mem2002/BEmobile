const User = require("../models/User");

//đây chính là controllerrrrrrrrrrrrr
const getHomepage = async (req, res) => {
  // process data
  // call model
  let results = await User.find({});
  // res.send('Hello world với Hoi Dan IT & Eric! & nodemon')
  console.log("results", results);
  return res.render("home.ejs", { listUsers: results });
};

const getABC = (req, res) => {
  // nếu mà ta định nghĩa 1 cái hàm đơn lẻ không trong cái web.js kia thì ta sẽ khong có hai biến req và res
  res.send("get ABC");
};
const getHoiDanIT = (req, res) => {
  // res.send("1111111111 vs Nam Anh");
  res.render("sample.ejs"); // tạo ra 1 view động
};
const postlogin = (req, res) => {
  res.render("login.ejs"); // tạo ra 1 view động
};
const getregister = (req, res) => {
  res.render("register.ejs"); // tạo ra 1 view động
};

const getcookie = (req, res) => {
  const cookies = req.cookies;
  res.send(cookies);
};

const getcookies = (req, res) => {
  res
    .cookie("username", "tipsjavascript", {
      // maxAge: 5*1000
      httpOnly: true,
    })
    .cookie("blog", "http://anonsytick.com", {
      httpOnly: true,
      secure: true,

      //truyền tải 1 dao thức protocol http
    });
  res.send("SET COOKIES");
};

const delcookie = (req, res) => {
  res.clearCookie('blog')
  res.send('DEL COOKIES')
}

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
  getHomepage,
  getABC,
  getHoiDanIT,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoveUser,
  postlogin,
  getregister,
  getcookie,
  getcookies,
  delcookie
};
