const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "role",
      },
      role_name: {
        type: String,
      },
    },
  },
);

module.exports = mongoose.model("UserTest2", userSchema);

