const express = require("express");
const services = require("../services/render");
const auths = require("../services/auth");
const router = express.Router();

//Apis
router.post("/add", services.addProduct);
router.get("/all", services.getData);
router.get("/api/:id", services.getProductDetail);
router.put("/:id", services.updateProduct);
router.delete("/:id", services.deleteProduct);
router.post("/credentials", services.addCredentials);
router.post("/login", services.checkLoginCredentials);
// router.post("/checklogin", services.checkSession);
router.post("/company/:id", services.companyName);
router.post("/meds", services.allMeds);
router.post("/prices", services.allPrices);
router.post("/updateStock/:id", services.updateQuantity);
router.post("/email", services.checkEmail);
router.post("/sendemail", services.sendEmail);
router.post("/resetpassword", services.resetPassword);
router.post("/takenOrNot", services.takenOrNot);
router.post("/emailAlreadyExists", services.emailAlreadyExists);
// router.post("/fetchBothTokens", auths.returnTokens);
router.post("/verifyAuth", auths.verifyAuth);

// Handling And Deleting The Expired Stock..
router.post("/schedule", services.schedule);

router.post("/expired", services.getAllExpired);

module.exports = router;
