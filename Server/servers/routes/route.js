const express = require("express");
const services = require("../services/render");

const router = express.Router();
 
//Apis
router.post("/add", services.addProduct);
router.get("/all", services.getData);
router.get("/:id", services.getProductDetail);
router.put("/:id", services.updateProduct);
router.delete("/:id", services.deleteProduct);
router.post("/credentials", services.addCredentials);
router.post("/login", services.checkLoginCredentials);
router.post("/company/:id", services.companyName);
router.post("/meds", services.allMeds);
router.post("/prices", services.allPrices);
router.post("/updateStock/:id", services.updateQuantity);

module.exports = router;
