const mongoose = require("mongoose");
const ShopDb = require("../model/model");
const LoginDb = require("../model/loginModel");
const ExpiredDb = require("../model/expiedModel");

const myQueues = require("../../processer/index");

const Queue = require("bull");
// const { REDIS_PORT, REDIS_URI } = require("./redisCredentials");
const { REDIS_PORT, REDIS_URI } = require("../redis/redisCredentials");

const expiredQueue = new Queue("expiredQueue", {
  redis: {
    port: REDIS_PORT,
    host: REDIS_URI,
  },
});

const workerImplementation = async (req, res) => {
  try {
    console.log("called render");
    const allItems = await ShopDb.find();
    // const delayBetweenJobs = 4000;

    allItems.forEach((item, i) => {
      expiredQueue.add({ item }).then((job) => {
        if (i + 1 === allItems.length) {
          console.log("Added");
        }
      });
    });

    // console.log(expiredQueue);

    myQueues.callingQueues();
    // myFunc();
  } catch (err) {
    console.log(err, "Backend Failure While deleting expired stock");
  }
};

exports.addProduct = async (req, res) => {
  try {
    // console.log(req.body);
    const obj = ShopDb(req.body);

    obj.save();
    console.log("Added Successfully");
    workerImplementation();
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
    workerImplementation();
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
  // console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;

  try {
    // console.log(username);
    // console.log(password);

    const user = await LoginDb.findOne({ username });

    // console.log(user.password);

    if (password != user.password) {
      // console.log("NOT WELCOME");
      res.json({ isCorrect: false });
    } else {
      // console.log("Welcome");
      // console.log(user._id);
      res.json({ isCorrect: true, userId: user._id });
    }
  } catch (err) {
    // console.log("Not Exist");
    res.json({ isText: "not" });
  }
};

exports.companyName = async (req, res) => {
  try {
    // console.log(req.params.id);
    const data = await LoginDb.findById(req.params.id);
    // console.log(data);
    // console.log(data.shop);
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
    // console.log(data);
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
    // console.log(req.body);
    // console.log(req.params.id);
    // console.log(newQuant);

    await ShopDb.updateOne({ _id: req.params.id }, { quantity: newQuant });
    // console.log("update quant");
    res.json("stock was updated");
  } catch (e) {
    console.log("Backend Failure While updating quantity");
  }
};

exports.schedule = async (req, res) => {
  try {
    // console.log("called render");
    const allItems = await ShopDb.find();
    // const delayBetweenJobs = 4000;

    allItems.forEach((item, i) => {
      expiredQueue.add({ item }).then((job) => {
        if (i + 1 === allItems.length) {
          res.json({
            message: "All Products Have Been Added In The Queue",
          });
        }
      });
    });
  } catch (err) {
    console.log(err, "Backend Failure While deleting expired stock");
  }
};

exports.getAllExpired = async (req, res) => {
  try {
    const expiredData = await ExpiredDb.find({});
    res.json(expiredData);
  } catch {
    console.log("Backend Failure While sending expired stock");
  }
};

// exports.deleteQueueItem = async (deletedId) => {
//   // console.log("finally to the delete");
//   // try {
//   //   await ShopDb.deleteOne({ _id: deletedId });
//   //   res.json("Deleted");
//   //   console.log("Deleted From The Queue Successfully");
//   // } catch (e) {
//   //   console.log("Failure While Deleting Item From The Backend");
//   // }
// };
