const express = require("express");

const {
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
} = require("../controllers/homeController");
var cookieParser = require('cookie-parser')
const router = express.Router();
router.use(cookieParser());
// router.Method('/route', handler)
//khai báo route
router.get("/", getHomepage);
//getHomepage() để ngoặc là thực thi hàm ngay tại đây
router.get("/abc", getABC); // nhờ có việc khai báo hàm handler bên trong cái router này nên chúng ta có req và res truyền tử trên xuống dưới ở homeController

router.get("/hoidanit", getHoiDanIT);
router.get("/login", postlogin);
router.get("/register", getregister);
router.get("/cookie/set", getcookies);
router.get("/cookie/get", getcookie);
// xóa cookie
router.get("/cookie/del", delcookie);

// router.get('/create', getCreatePage);
router.get("/update/:id", getUpdatePage);
router.get("/create", getCreatePage);

router.post("/create-user", postCreateUser);

router.post("/update-user", postUpdateUser);
router.post("/delete-user/:id", postDeleteUser);
router.post("/delete-user", postHandleRemoveUser);

// router.post('/create-user', postDeleteUser);
// router.post('/create-user', postHandleRemoveUser);

module.exports = router; //export default: chỉ xuất ra 1 biến thôi
