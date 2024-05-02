require("dotenv").config();
const express = require("express"); //commonjs
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routers/web");

// import express from 'express'
// console.log(">>> check env: ", process.env);

const app = express(); // app express
const port = process.env.PORT || 8888; // port => hardcode . uat .prod
const hostname = process.env.HOST_NAME;

//req (request), res(response) là 2 object trong môi trường Node.js
//config template engine
configViewEngine(app); // cấu hình file config

//khai báo routes
app.use("/", webRoutes);// dể / ở đây có nghĩa là để / trước /hoidanit //đây chính là router

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
