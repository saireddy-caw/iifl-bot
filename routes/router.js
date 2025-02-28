const express = require('express');
const router = express.Router();
const verify = require("./verifytoken");


const OTPController = require("../controllers/otp");
// const otplist = require('../models/otplist');
// const usercontroller = require("../controllers/user");
// const jobapplicationcontroller = require("../controllers/jobapplication");
// const workhourscontroller = require("../controllers/workhours");
// const leavecontroller = require("../controllers/leave");
// const attendancecontroller = require("../controllers/attendance");
// const compoffcontroller = require("../controllers/compoffreq");
// const payslipcontroller = require("../controllers/payslip");
// const teamcontroller = require('../controllers/team');
// const earlyrequest_controller = require('../controllers/earlyrequest')


// email verification & Login
router.post("/sendOTP", OTPController.sendOTP)
router.post("/verifyOTP", OTPController.verifyOTP)



module.exports = router;