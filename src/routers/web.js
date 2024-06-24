const express = require("express");
const session = require("express-session");
const reqlogin = require("../middleware/reqlogin");

const {
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
  postLoginUser,
  // getcookie,
  // setcookie,
  // delcookie,
  getbooks,
  // UserLogin
  getRegisterUser,
  postRegisterUser,
  getloginUser,
} = require("../controllers/homeController");
const router = express.Router();
// var cookieParser = require("cookie-parser");
// router.use(cookieParser());

router.use(
  session({
    secret: "Key that will sign cookie",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// const isAuth = (req, res, next) => {
//   if (req.session.isAuth) {
//     next();
//   } else {
//     res.redirect("/login");
//   }
// };
// router.use(cookieParser());
// // router.Method('/route', handler)
// app.use(session({
//   secret: 'your_secret_key', // Khóa bí mật dùng để ký session ID cookie
//   resave: false, // Không lưu session nếu không có sự thay đổi
//   saveUninitialized: true, // Lưu session mới ngay cả khi chưa có dữ liệu
// }));

//khai báo route
router.get("/", getHomePage);
router.get("/books", getbooks);

// router.get("/login", getlogin);

router.get("/login", getLoginAdmin);
router.post("/loginAdmin", postLoginAdmin);
router.get("/registeradmin", getRegisterAdmin);
router.post("/registeradmin", postRegisterAdmin);
router.get("/loginUser", getloginUser);
router.post("/loginUser", postLoginUser);
router.get("/registerUser", getRegisterUser);
router.post("/registerUser", postRegisterUser);
// router.use(reqlogin);
router.get("/listUser", reqlogin, getListUser);
// router.get("/cookie/set", setcookie);
// router.get("/cookie/get", getcookie);
// xóa cookie
// router.get("/cookie/del", delcookie);

router.get("/create", getCreatePage);
router.get("/update/:id", getUpdatePage);
router.get("/create", getCreatePage);

router.post("/create-user", postCreateUser);

router.post("/update-user", postUpdateUser);
router.post("/delete-user/:id", postDeleteUser);
router.post("/delete-user", postHandleRemoveUser);

// router.post('/create-user', postDeleteUser);
// router.post('/create-user', postHandleRemoveUser);

module.exports = router; //export default: chỉ xuất ra 1 biến thôi
