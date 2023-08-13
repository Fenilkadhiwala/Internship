const mongoose = require("mongoose");
const ShopDb = require("../model/model");
const LoginDb = require("../model/loginModel");
const ExpiredDb = require("../model/expiedModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const saltRound = 10;
const jwt = require("jsonwebtoken");
let refreshToken = "";
let accessToken = "";
const accessSecretKey =
  "4dfa612e335f1c258faf55a867c5ac12b77934d1938e1410ab0241b960872f02";
const refreshSecretKey =
  "7bcef4e5b4a91ddc7afdcc31af961a61e2ba827f060ac00c3510b41e9cefd78f";

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
    const password = req.body.password;

    bcrypt.hash(password, saltRound, (e, hash) => {
      if (e) {
        console.log(e);
      }
      const loginObj = new LoginDb({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        shop: req.body.shop,
        password: hash,
      });
      loginObj.save();
      console.log("Registered Successfully");
    });

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

    bcrypt.compare(password, user.password, (e, response) => {
      if (response) {
        refreshToken = jwt.sign({ user }, refreshSecretKey, {
          expiresIn: "7d",
        });

        accessToken = jwt.sign({ user }, refreshSecretKey, {
          expiresIn: "10m",
        });

        res.cookie("refreshToken", refreshToken, { httpOnly: true });
        res.cookie("accessToken", accessToken);

        res.json({ isCorrect: true, userId: user._id });
      } else {
        res.json({ isCorrect: false });
      }
    });
  } catch (err) {
    // console.log("Not Exist");
    res.json({ isText: "not" });
  }
};

// const setCookieFunc = (
//   refreshToken,
//   accessToken,
//   refreshSecretKey,
//   accessSecretKey
// ) => {
//   const tokenObj = {
//     refresh: refreshToken,
//     access: accessToken,
//     refreshKey: refreshSecretKey,
//     accessKey: accessSecretKey,
//   };

//   console.log("from render", tokenObj);
//   return tokenObj;
// };

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

exports.checkEmail = async (req, res) => {
  try {
    console.log(req.body.email);

    const email = req.body.email;

    const us = await LoginDb.findOne({ email });

    if (!us) {
      res.json({ userStatus: false });
    } else {
      res.json({ userStatus: true });
    }
  } catch {
    console.log("Backend Failure While checking email");
  }
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "fenilkadhiwala.co20d1@scet.ac.in",
    pass: "Fenildarshanmeghajeel29192630",
  },
});

exports.sendEmail = async (req, res) => {
  try {
    const em = req.body;

    const email = Object.keys(em)[0];
    console.log(email);

    const mailOptions = {
      from: "fenilkadhiwala.co20d1@scet.ac.in",
      to: email,
      subject: "Subject of the email",
      text: "http://localhost:3000/reset",
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Error sending email" });
      } else {
        console.log("Email sent:", info.response);
        res.json({ emStatus: true });
      }
    });
  } catch {
    console.log("Backend Failure While sending email");
  }
};

exports.resetPassword = async (req, res) => {
  try {
    // console.log(req.body);
    const email = req.body.email;
    const newPass = req.body.newPassword;

    const user = await LoginDb.findOne({ email });
    // console.log(user);
    const newHashedPass = await bcrypt.hash(newPass, saltRound);
    user.password = newHashedPass;

    await user.save();
    return res.json({ resetBool: true });
  } catch {
    console.log("Backend Failure While reseting password");
    return res.json({ resetBool: false });
  }
};

exports.takenOrNot = async (req, res) => {
  try {
    // console.log(req.body);
    const keysAr = Object.keys(req.body);
    const value = keysAr[0];

    const result = await LoginDb.findOne({ username: value });

    if (result) {
      res.json({ taken: true });
    } else {
      res.json({ taken: false });
    }
  } catch {
    console.log(
      "Backend Failure while checking username has been taken or not"
    );
  }
};

exports.emailAlreadyExists = async (req, res) => {
  try {
    const userEmail = req.body;
    // console.log(userEmail);
    const email = Object.keys(userEmail)[0];
    // console.log(email);

    const emailResult = await LoginDb.findOne({ email: email });

    if (emailResult) {
      res.json({ alreadyHasAccount: true });
    } else {
      res.json({ alreadyHasAccount: false });
    }
  } catch {
    console.log("Backend Failure while checking user has account or not");
  }
};
