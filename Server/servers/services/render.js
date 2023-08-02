const mongoose = require("mongoose");
const ShopDb = require("../model/model");
const LoginDb = require("../model/loginModel");

exports.addProduct = async (req, res) => {
  try {
    // console.log(req.body);
    const obj = ShopDb(req.body);

    obj.save();
    console.log("Added Successfully");
    res.json("Added");
  } catch (err) {
    console.log("Backend Failure While Adding Data");
  }
};

exports.getData = async (req, res) => {
  try {
    const data = await ShopDb.find({});
    res.json(data);
  } catch (err) {
    console.log("Backend Failure While Fetching Data");
  }
};

exports.getProductDetail = async (req, res) => {
  try {
    const data = await ShopDb.findById(req.params.id);
    res.json(data);
  } catch {
    console.log("Backend Failure While Fetching Data For Update");
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const obj = ShopDb(req.body);

    await ShopDb.updateOne({ _id: req.params.id }, obj);
    res.json("Updated Successfully");
  } catch {
    console.log("Backend Failure While Updating Data");
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await ShopDb.deleteOne({ _id: req.params.id });
    res.json("Deleted");
    console.log("Updated Successfully");
  } catch {
    console.log("Backend Failure While Updating Data");
  }
};

exports.addCredentials = async (req, res) => {
  try {
    const loginObj = new LoginDb(req.body);
    loginObj.save();

    console.log("Registered Successfully");
    res.json("Registered");
  } catch (e) {
    console.log("Backend Failure While Adding User's Credentials");
  }
};

exports.checkLoginCredentials = async (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;

  try {
    // console.log(username);
    // console.log(password);

    const user = await LoginDb.findOne({ username });

    console.log(user.password);

    if (password != user.password) {
      console.log("NOT WELCOME");
      res.json({ isCorrect: false });
    } else {
      console.log("Welcome");
      console.log(user._id);
      res.json({ isCorrect: true, userId: user._id });
    }
  } catch (err) {
    console.log("Not Exist");
    res.json({ isText: "not" });
  }
};

exports.companyName = async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await LoginDb.findById(req.params.id);
    console.log(data);
    console.log(data.shop);
    res.json(data);
  } catch {
    console.log("Backend Failure While fetching company's name");
  }
};

exports.allMeds = async (req, res) => {
  try {
    const data = await ShopDb.find({});
    // console.log(data);
    res.json(data);
  } catch {
    console.log("Backend Failure While fetching all prices");
  }
};

exports.allPrices = async (req, res) => {
  try {
    const data = await ShopDb.find(
      {},
      { _id: 1, price: 1, name: 1, quantity: 1 }
    );
    console.log(data);
    res.json(data);
  } catch {
    console.log("Backend Failure While fetching all item's name");
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    // console.log(req.body);
    const myQuant = req.body;
    const keyArr = Object.keys(myQuant);

    const newQuant = parseInt(keyArr[0]);
    console.log(req.body);
    console.log(req.params.id);
    console.log(newQuant);

    await ShopDb.updateOne({ _id: req.params.id }, { quantity: newQuant });
    console.log("update quant");
    res.json("stock was updated");
  } catch (e) {  
    console.log("Backend Failure While updating quantity");
  }
};
