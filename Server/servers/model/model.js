const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  company: {
    type: String,
    require: true,
  },

  name: {
    type: String,
    require: true,
  },

  quantity: {
    type: Number,
    require: true,
  },

  price: {
    type: Number,
    require: true,
  },

  expiry: {
    type: String,
    require: true,
  },
});

const ShopDb = mongoose.model("Shop", shopSchema);

module.exports = ShopDb;
