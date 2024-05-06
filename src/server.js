require("dotenv").config();
const express = require("express"); //commonjs
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routers/web");
const connection = require("./config/database");


// import express from 'express'
// console.log(">>> check env: ", process.env);

const app = express(); // app express
const port = process.env.PORT || 8888; // port => hardcode . uat .prod
const hostname = process.env.HOST_NAME;

//config req.body
app.use(express.json()); //for json
app.use(express.urlencoded({extended: false})); //for form data


//req (request), res(response) là 2 object trong môi trường Node.js
//config template engine
configViewEngine(app); // cấu hình file config

//khai báo routes
app.use("/", webRoutes); // dể / ở đây có nghĩa là để / trước /hoidanit //đây chính là router

// const cat = new Kitten({ name: "Hoi dan IT model" });
// cat.save();

(async () => {
  //test connection
  try {
    await connection();
    app.listen(port, hostname, () => {
      console.log(`Backend zero app listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>> Error connect to DB", error);
  }
})();
