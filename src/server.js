require("dotenv").config();
const express = require("express"); //commonjs
const configViewEngine = require("./config/viewEngine");
const mobileRoutes = require("./routers/web");

// import express from 'express'
// console.log(">>> check env: ", process.env);

const app = express(); // app express
const port = process.env.PORT || 8888; // port => hardcode . uat .prod
const hostname = process.env.HOST_NAME;
//khai báo routes
app.use("/", mobileRoutes);

//req (request), res(response) là 2 object trong môi trường Node.js
//config template engine
configViewEngine(app);

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});
