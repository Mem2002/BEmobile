const User = require("../models/User");

//đây chính là controllerrrrrrrrrrrrr
const getHomepage = async (req, res) => {
  // process data
  // call model
  let results = await User.find({});
  // res.send('Hello world với Hoi Dan IT & Eric! & nodemon')
  console.log("results", results)
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
const postCreateUser = async (req, res) => {
  // console.log(">>> req.body: ", req.body)
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  // console.log(">>> email = ", email, "name = ", name, "city = ", city);
  // c1
  await User.create({
    email: email,
    name: name,
    city: city,
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
  const userId = req.params.id;
  // let user = await getUserById(userId);
  let user = await User.findById(userId).exec();
  // console.log(">>> req.params::", req.params, userId)
  res.render("edit.ejs", {userEdit: user});
};

// const getUpdatePage = async(req, res) =>{
//   const userId = req.params.id;
//   let user = await getUserById(userId);
//   res.render('edit.ejs', {userEdit: user});
// }
const postUpdateUser = async(req,res) =>{
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  let userId = req.body.userId;

  // console.log(">>> email = ", email, 'name = ', name, 'city = ', city)
  console.log("")
  await User.updateOne({_id: userId}, {email: email, name: name, city: city});
  res.redirect('/');
  // c1
  // await User.create({
  //   email: email,
  //   name: name,
  //   city: city,
  //   userId: userId
  // })
  // c2:
  //  await User.create({
  //   email,
  //   name,
  //   city
  // })
  // res.send('Updated user succeed!')
}

module.exports = {
  //export ra nhiều biến(object)
  getHomepage,
  getABC,
  getHoiDanIT,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
};
