const express = require("express"); //commonjs
const path = require('path'); 
// import express from 'express'
const app = express(); // app express
const port = 8080; // port => hardcode . uat .prod
//khai báo routes
//req (request), res(response) là 2 object trong môi trường Node.js
//config template engine
app.set('views', path.join(__dirname, 'views'));//nơi lưu trữ engine đấy
app.set('view engine', 'ejs')//khai báo view engine

//khai báo route
app.get("/", (req, res) => {
  res.send("Hello World! vs Nam Anh");
});

app.get("/abc", (req, res) => {
  res.send("1111111111 vs Nam Anh");
});

app.get("/hoidanit", (req, res) => {
  // res.send("1111111111 vs Nam Anh");
  res.render('sample.ejs') // tạo ra 1 view động 
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
