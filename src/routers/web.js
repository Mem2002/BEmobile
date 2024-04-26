const express = require("express");

const router = express.Router();
//khai báo route
router.get("/", (req, res) => {
  res.send("Hello World! vs Nam Anh vs nodemon");
});

router.get("/abc", (req, res) => {
  res.send("1111111111 vs Nam Anh");
});

router.get("/hoidanit", (req, res) => {
  // res.send("1111111111 vs Nam Anh");
  res.render("sample.ejs"); // tạo ra 1 view động
});
module.exports = router //export default