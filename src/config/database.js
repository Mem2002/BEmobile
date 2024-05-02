require("dotenv").config();
const mongoose = require("mongoose");

const dbState = [
  {
    value: 0,
    label: "disconnected",
  },
  {
    value: 1,
    label: "connected",
  },
  {
    value: 2,
    label: "connecting",
  },
  {
    value: 3,
    label: "disconnecting",
  },
];

const connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://namanh030802:Mem%40%40382002@fptmobile.hgqhsmu.mongodb.net/"
    );
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find((f) => f.value == state).label, "to db"); // connected to db
  } catch (error) {
    //   handleError(error);
    console.log(">>> Error connection DB: ", error);
  }
};

module.exports = connection;
