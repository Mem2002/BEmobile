require("dotenv").config();
const express = require("express"); //commonjs
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routers/web");
const apiRoutes = require("./routers/api");
const authRouter = require("./routers/auth")
const connection = require("./config/database");
const session = require('express-session');
// const cookieParser = require('cookie-parser');
// import {createJWT}  from "./middleware/jwtAction"



const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;
app.use(express.json());
app.use(express.urlencoded({extended: false}));

configViewEngine(app); // cấu hình file config

app.use("/", webRoutes); 
app.use("/v1/api", apiRoutes);
app.use("/auth", authRouter);

app.listen(port, async () => {
  try {
    await connection();
    console.log(`App is running at ${port}`);
  } catch (err) {
    console.log(">>> Error connect to DB", error);
    console.log(">>> Err when starting server: " + err);
  }
});
