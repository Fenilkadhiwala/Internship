const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },

  email: {
    type: String,
    require: true,
  },

  phone: {
    type: Number,
    require: true,
  },

  shop:{
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },
});

const LoginDb = mongoose.model("Login", loginSchema);

module.exports = LoginDb;
