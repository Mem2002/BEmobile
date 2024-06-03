const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    // role: {
    //   role_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "role",
    //   },
    //   role_name: {
    //     type: String,
    //   },
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("admin", userSchema);
