const User = require("../models/UserTest");
const validateRegister = require("../services/registerLoginService");
const bcrypt = require ('bcrypt');



//---------------- Login ------------------
//check lengthen of password
const isPasswordLength = (password) => {
  return password.length >= 8;
};

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compareSync(inputPassword, hashPassword);
};

const UserLogin = async (rawData) => {
  try {
    // Check if email and password are not empty
    if (!rawData.email || !rawData.password) {
      return {
        EM: "Email and password must not be empty",
        EC: 1,
        DT: "",
      };
    }

    // Check if password length is between 8 and 10

    // Check if email length is between 50 and 255
    // if (rawData.email.length < 10 || rawData.email.length > 55) {
    //   return {
    //     EM: "Email must be between 50 and 255 characters",
    //     EC: 1,
    //     DT: "",
    //   };
    // }

    const isEmail = validator.isEmail(rawData.email);
    if (isEmail) {
      let user = await User.findOne({ email: rawData.email });
      if (user) {
        let IsCorrectPass = checkPassword(rawData.password, user.password);
        if (IsCorrectPass === true) {
          let groupWithRole = await getGWR.GetGroupWithRole(user);
          let tokenJWT = await JWTaction.createJWT({
            id: user._id,
            email: user.email,
            groupWithRole,
            faculty_id: user.faculty ? user.faculty.faculty_id : null,
          });
          return {
            EM: "Login successful",
            EC: 0,
            DT: {
              access_token: tokenJWT,
              expiresIn: process.env.JWT_EXPIRES_IN,
              data: {
                id: user._id,
                username: user.username,
                groupWithRole,
                faculty_id: user.faculty ? user.faculty.faculty_id : null,
              },
            },
          };
        }
      }
      return {
        EM: "Your email or password is incorrect",
        EC: 1,
        DT: "",
      };
    } else {
      return {
        EM: "user name is not a email or is not email",
        EC: 1,
        DT: "",
      };
    }
  } catch (e) {
    console.log(">>> Error login user (service): " + e.message);
    return {
      EM: "Something Wrong with server",
      EC: 10,
    };
  }
};


const postregister = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      EM: "Missing data required", 
      EC: "1", 
      DT: "", 
    });
  }

  let isUsernameExists = await validateRegister.checkEmail(req.body.email);
  if (isUsernameExists == true) {
    // console.log("The email already exists");
    return res.status(400).json({
      EM: "The email already exists", 
      EC: "1", 
      DT: "", 
    });
  }

  if (!validateRegister.isPasswordStrong(req.body.password)) {
    return res.status(400).json({
      EM: "Password needs 1 uppercase letter, 1 special character, 1 digit, and minimum 8 characters.", //error message
      EC: "1", //error code
      DT: "", //data
    });
  }
  // if (user) {
  //   return res.redirect("/register");
  // }
  

  const hashedPsw = await bcrypt.hash(password, 12);
  user = new User({
    username,
    email,
    password: hashedPsw,
  });

  const a = await user.save();
  console.log(a);
  return res.status(200).json({ 
    EM: "User created successfully", //error message
    EC: "0", //error code
    DT: a, //data
  })
  // req.session.isAuth = true;
  // res.redirect("/login");
};


const postlogin = async (req, res) => {
  const { email, password } = req.body;

  if ( !email || !password) {
    return res.status(400).json({
      EM: "Missing data required", 
      EC: "1", 
      DT: "", 
    });
  }
  let isEmailExists = await validateRegister.checkUsername(req.body.username);
  if (isEmailExists == true) {
    // console.log("The username already exists");
    return res.status(400).json({
      EM: "The username already exists", 
      EC: "1", 
      DT: "",
    });
  }
  let isUsernameExists = await validateRegister.checkEmail(req.body.email);
  if (isUsernameExists == true) {
    // console.log("The email already exists");
    return res.status(400).json({
      EM: "The email already exists", 
      EC: "1", 
      DT: "", 
    });
  }

  if (!validateRegister.isPasswordStrong(req.body.password)) {
    return res.status(400).json({
      EM: "Password needs 1 uppercase letter, 1 special character, 1 digit, and minimum 8 characters.", //error message
      EC: "1", //error code
      DT: "", //data
    });
  }
  // if (user) {
  //   return res.redirect("/register");
  // }
  

  const hashedPsw = await bcrypt.hash(password, 12);
  user = new User({
    username,
    email,
    password: hashedPsw,
  });

  const a = await user.save();
  console.log(a);
  return res.status(200).json({ 
    EM: "User created successfully", //error message
    EC: "0", //error code
    DT: a, //data
  })
  // req.session.isAuth = true;
  // res.redirect("/login");
};


const getUsersAPI = async (req, res) => {
  let results = await User.find({});
  return res.status(200).json({
    // mã lỗi để hiển thị 1 cách linh động
    EC: 0,
    data: results,
  });
};
const postCreateUserAPI = async (req, res) => {
  // console.log(">>> req.body: ", req.body)
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  let user = await User.create({
    email: email,
    name: name,
    city: city,
  });
  return res.status(200).json({
    EC: 0,
    data: user,
  });
};
const putUpdateUserAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  let userId = req.body.userId;

  let user = await User.updateOne(
    { _id: userId },
    { email: email, name: name, city: city }
  );
  return res.status(200).json({
    EC: 0,
    data: user,
  });
};
const deleteUserAPI = async (req, res) => {
  const id = req.body.userId;
  let results = await User.deleteOne({
    _id: id,
  });
  return res.status(200).json({
    EC: 0,
    data: results,
  });
};
module.exports = {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postregister,
  postlogin,
  UserLogin,
};
