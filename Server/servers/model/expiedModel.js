const mongoose = require("mongoose");

const expiredModel = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  expiry: {
    type: String,
    require: true,
  },

  remainingQuantity: {
    type: Number,
    require: true,
  },

  removedOn: {
    type: String,
    require: true,
  },
});

const ExpiredDb = mongoose.model("expire", expiredModel);

module.exports = ExpiredDb;
