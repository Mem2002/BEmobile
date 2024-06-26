
const path = require("path");// thư viện path đc node js hỗi trợ ko cần phải import
const express = require("express"); //commonjs

const configViewEngine = (app) => {
  app.set("views", path.join("./src", "views")); //nơi lưu trữ engine đấy
  app.set("view engine", "ejs"); //khai báo view engine
  //config static files: image/css/js
  app.use(express.static(path.join("./src", "public"))); //express tất cả các file chúng ta muốn lấy động sẽ tìm trong mục public
};
//export thằng configViewEngine dùng module
module.exports = configViewEngine; //tham chiếu tới configViewEngine
