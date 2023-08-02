const mongoose = require("mongoose");

const ConnectDb = async () => {
  const MONGO = process.env.MONGO;

  try {
    const connection = await mongoose.connect(MONGO);
    console.log("Connected To The Database");
  } catch (err) {
    console.log("Failed To Connect With The Database");
  }
};

module.exports = ConnectDb;
