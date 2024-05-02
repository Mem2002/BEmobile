const express = require("express");
const { getHomepage, getABC, getHoiDanIT } = require("../controllers/homeController");
const router = express.Router();
// router.Method('/route', handler)
//khai báo route
router.get("/", getHomepage);
//getHomepage() để ngoặc là thực thi hàm ngay tại đây
router.get("/abc", getABC);// nhờ có việc khai báo hàm handler bên trong cái router này nên chúng ta có req và res truyền tử trên xuống dưới ở homeController

router.get("/hoidanit", getHoiDanIT);
module.exports = router; //export default: chỉ xuất ra 1 biến thôi
