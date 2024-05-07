const express = require("express");

const routerAPI = express.Router();
// router.Method('/route', handler)
//khai báo route
const {getUsersAPI, postCreateUserAPI} = require('../controllers/apicontrollers')
// routerAPI.get("/", (req, res) => {
//   res.send("Hello");
// });
// routerAPI.get("/abc", (req, res) => {
//   res.status(200).json({ data: "Hello world first apis" });
// });



routerAPI.get("/users", getUsersAPI);

routerAPI.post("/users", postCreateUserAPI);

// router.post('/delete-user', postHandleRemoveUser);

// router.post('/create-user', postDeleteUser);
// router.post('/create-user', postHandleRemoveUser);

module.exports = routerAPI; //export default: chỉ xuất ra 1 biến thôi
