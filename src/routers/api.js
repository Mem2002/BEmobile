const express = require("express");

const routerAPI = express.Router();
// router.Method('/route', handler)
//khai báo route
const {getUsersAPI, postCreateUserAPI, putUpdateUserAPI, deleteUserAPI, postregister, postlogin, getUsersPayslipAPI} = require('../controllers/apicontrollers')


routerAPI.get("/users", getUsersAPI);
routerAPI.post("/users", postCreateUserAPI);
//=> Dùng cùng một endpoint /users cho cả GET và POST 
routerAPI.put("/users", putUpdateUserAPI);
routerAPI.delete("/users", deleteUserAPI);

routerAPI.get("/user/payslip/by-month", getUsersPayslipAPI);

routerAPI.get("/register", postregister);
routerAPI.get("/login", postlogin);
// routerAPI.post("/userInformation", information);



// router.post('/delete-user', postHandleRemoveUser);

// router.post('/create-user', postDeleteUser);
// router.post('/create-user', postHandleRemoveUser);

module.exports = routerAPI; //export default: chỉ xuất ra 1 biến thôi
