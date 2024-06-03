const express = require("express");
const session = require("express-session");

const {
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
  postRegisterAdmin,
  getlogin,
  getRegisterAdmin,
  // getcookie,
  // setcookie,
  // delcookie,
  getbooks,
  // UserLogin
  getRegisterUser,
  postRegisterUser,

} = require("../controllers/homeController");
const router = express.Router();
var cookieParser = require("cookie-parser");
router.use(cookieParser());

router.use(
  session({
    secret: "Key that will sign cookie",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);

const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/login");
  }
};
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

router.get("/listUser", isAuth, getListUser);
//getHomepage() để ngoặc là thực thi hàm ngay tại đây
router.get("/abc", getABC); // nhờ có việc khai báo hàm handler bên trong cái router này nên chúng ta có req và res truyền tử trên xuống dưới ở homeController


router.get("/login", getlogin);
router.get("/registeradmin", getRegisterAdmin);
router.post("/login", postlogin);
router.post("/registeradmin", postRegisterAdmin);
router.get("/registerUser", getRegisterUser);
router.post("/registerUser", postRegisterUser);
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
