const express = require('express');
const router = express.Router();
const verify = require("./verifytoken");


const OTPController = require("../controllers/otp");
const ServiceableAreaController = require("../controllers/serviceablearea");
const LeadController = require("../controllers/leads");


// OTP
router.post("/sendOTP", OTPController.sendOTP)
router.post("/verifyOTP", OTPController.verifyOTP)

//Serviceable Area
router.post("/addarea", ServiceableAreaController.addarea)
router.get("/getarea", ServiceableAreaController.getArea)

//Lead status
router.post("/createlead", LeadController.createlead)
router.delete("/deletelead", LeadController.deleteLead)



module.exports = router;