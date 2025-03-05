const otplist = require('../models/otplist');
const Leads = require('../models/lead');
const jwt = require('jsonwebtoken');
const client = require('twilio')(process.env.accountSid, process.env.authToken);



//Send OTP
exports.sendOTP = async(req, res) => {
    try {
        
            if(!req.body.phone){
                return res.status(400).send({ message: "please enter phone" });
            }
            if(!req.body.phone.length == 10){
                return res.status(400).send({ message: "please enter valid phone number" });
            }

            if(!req.query.type){
                return res.status(400).send({ message: "please provide type" });
            }

            if(req.query.type == "staging"){
                return res.status(200).send({ message: "message sent" });
            }

            var myotp = Math.random().toString().substr(2, 6);

            try{
                client.messages
                .create({
                    body: `${myotp} is your code`,
                    to: `+91${req.body.phone}`,
                    from: '+17623185826'
                })
                .then(message => console.log(message));
            }catch(error) {
                return res.status(400).json({ message: error });
            }

            const myotplog = await otplist({
                otp: myotp,
                phone: req.body.phone
            })
            await myotplog.save();
            if (myotplog) {
                return res.status(200).json(myotplog);
            } else {
                return res.status(400).json({ message: "Internal server error" })
            }
    }catch (error) {
        return res.status(400).json({ message: error });
    }
};

//verify OTP
exports.verifyOTP = async(req, res) => {
    try {
        if(!req.body.otp)
        return res.status(400).json({ message: "otp required" })

        if(!req.body.phone)
            return res.status(400).json({ message: "phone required" })

        if(!req.query.type){
            return res.status(400).send({ message: "please provide type" });
        }

        if(req.query.type == "staging"){
            return res.status(200).send({ message: "OTP Verified" });
        }

        const myotp = await otplist.find({phone:req.body.phone}).sort({date:-1}).limit(1);
        console.log(myotp[0]["otp"])
        console.log(req.body.otp)

        if (myotp[0]["otp"] == req.body.otp) {

            const mylead = await Leads.findOne({ phone: req.body.phone })
            if(mylead)
                return res.status(201).json(mylead);
            else
                return res.status(200).json(myotp[0]);
        } else if(myotp[0]["otp"] != req.body.otp) {
            return res.status(400).json({ message: "Incorrect OTP" })
        }else{
            return res.status(400).json({ message: "Something went wrong" })
        }
    } catch (error) {
        return res.status(400).json({ message: error });
    }
};
































// // mail verification of employee
// exports.verify = async(req, res) => {

//   try{
//       if(!req.body.email){
//           return res.status(400).send({ message: "please enter email" });
//       }
//       // email verification
//       const user =await employeedetails.findOne({
//           email:req.body.email
//       })
//   if(user){
//       let organization_ids =user.organization_id
//       const organisation =await organizations.findOne({
//           organization_id:organization_ids
//       })
//   let employeedetails={
//       fullname:user.fullname,
//       email:user.email,
//       phone:user.phone,
//       jobrole:user.jobrole,
//       dateofjoining:user.dateofjoining,
//       dateofbirth:user.dateofbirth,
//       date:user.date,
//       employee_id:user.employee_id,
//       organization_id:user.organization_id,
//       organization_logo:organisation.organization_logo,
//       organization_name:organisation.organization_name,
//   }
//       return res.status(200).json(employeedetails);
//   }  else
//   {
//       return res.status(400).send({message:"Email not found"})
//   }
//   }
//   catch(err){
//       return res.status(400).json({ message: err });        
//   }
// };

//   // Employee Login
//   exports.login = async(req,res)=>{
//     try{
//         if(!req.body.email){
//             return res.status(400).send({ message: "please enter email" });
//         }
//         // email verification
//         const user = await employeedetails.findOne({
//             email: req.body.email
//         })
//         if (user) {
//             let organization_ids = user.organization_id
//             const organisation = await organizations.findOne({
//                 organization_id: organization_ids
//             })
//             let employeedetails = {
//                 fullname: user.fullname,
//                 email: user.email,
//                 phone: user.phone,
//                 jobrole: user.jobrole,
//                 dateofjoining: user.dateofjoining,
//                 dateofbirth: user.dateofbirth,
//                 date: user.date,
//                 employee_id: user.employee_id,
//                 organization_id: user.organization_id,
//                 organization_logo: organisation.organization_logo,
//                 organization_name: organisation.organization_name,
//             }
//             return res.status(200).json(employeedetails);
//         } else {
//             return res.status(400).send({ message: "Email not found" })
//         }
//     } catch (err) {
//         return res.status(400).json({ message: err });
//     }
// };

// // Employee Login
// exports.login = async(req, res) => {
//         try {
//             if (!req.body.email) {
//                 return res.status(400).send({ message: "please enter email" });
//             }
//             if (!req.body.organization_id) {
//                 return res.status(400).send({ message: "please enter Organisaction Id" });
//             }
//             if (!req.body.password && !req.body.logintype) {
//                 return res.status(400).send({ message: "please enter password or Login with gmail" });
//             }
//             const user = await employeedetails.findOne({ email: req.body.email, organization_id: req.body.organization_id })
//                 // console.log(user)

//             if (user) {
//                 // login with password
//                 if (req.body.password) {
//                     if (user.password != req.body.password) {
//                         return res.status(400).send({ message: "Incorrect password" });
//                     } else {
//                         // return res.status(200).send({ message: user });                  
//                     const jwtresponse = {
//                          employee_id: user.employee_id,
//                          email: user.email,
//                          phone: user.phone,
//                          department: user.department,
//                          jobrole: user.jobrole,
//                          dateofjoining: user.dateofjoining,
//                          dateofbirth: user.dateofbirth,
//                          organization_id: user.organization_id,
//                          password: user.password,
//                          firstname: user.firstname,
//                          lastname: user.lastname,
//                          team_id: user.team_id

//                     }
//                         const token = jwt.sign({ user: jwtresponse },
//                             process.env.JWT_TOKEN_SECRET
//                         );
//                         return res.json({ user, token });
//                     }
//                 }
//                 // // login with gmail
//                 if (req.body.logintype === "gmail") {
//                     const token = jwt.sign({ user: user },
//                         process.env.JWT_TOKEN_SECRET
//                     );
//                     return res.json({ user, token });
//                 } else {
//                     return res.status(400).send({ message: "Invalid Login type" });
//                 }

//             } else {
//                 return res.status(400).send({ message: "User not found" });
//             }
//         } catch (err) {
//             return res.status(400).json({ message: err });

//         }
//  };

// // update password
// exports.updatepassword = async(req, res) => {
//     try {
//         if (!req.params.employee_id)
//             return res.status(400).send({ message: "Please send employee ID" })
//         if (!req.body.password)
//             return res.status(400).send({ message: "Please send New password" })
//         const result = await employeedetails.updateOne({ employee_id: req.params.employee_id }, {
//             $set: {
//                 password: req.body.password,
//             }
//         })
//         if (result)
//             return res.status(200).json(result)
//         if (!result)
//             return res.status(400).json({ message: "Internal server error" })
//     } catch (err) {
//         return res.status(400).json({ message: err });
//     }

// };


// //GET  ALL EMployees
// exports.allemployees = async(req, res) => {
//     try {
//         const employees = await employeedetails.find();

//         if (employees) {
//             return res.status(200).json(employees);
//         } else {
//             return res.status(400).json({ message: "Not Employee Found" })
//         }
//     } catch (error) {
//         return res.status(400).json({ message: error });
//     }
// };


// //GET  Single Employee
// exports.singleemployee = async(req, res) => {
//     try {
//         if(!req.params.employee_id)
//         return res.status(400).json({ message: "employee id required" })
//         const employees = await employeedetails.find({employee_id:req.params.employee_id});
//         if (employees) {
//             return res.status(200).json(employees);
//         } else {
//             return res.status(400).json({ message: "Not Employee Found" })
//         }
//     } catch (error) {
//         return res.status(400).json({ message: error });
//     }
// };

