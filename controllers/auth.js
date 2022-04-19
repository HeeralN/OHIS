const mysql = require('mysql');
// const jwt=require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const nodemailer = require('nodemailer');
// const sgTransport = require('nodemailer-sendgrid-transport');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,  //put ip address if not running on localhost
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});
//
// var options = {
//     auth: {
//         api_user: 'krishna_p1611',
//         api_key: 'ohissupport12345'
//     }
// }
//
// var client = nodemailer.createTransport(sgTransport(options));

// exports.studentCreateAccount = (req,res) => {
//     //console.log(req.body);
//     const {fullname, username, university, password, email, confirmpassword} = req.body;
//     req.body.temporarytoken = jwt.sign({username: req.body.username, email:req.body.email}, secret, {expiresIn: "24h"});
//     db.query("SELECT username, email FROM account WHERE username =? or email= ?", [username, email], async (error, results) => {
//         if (error) {
//             console.log(error);
//         }
//         if (results.length > 0) {
//             return res.render("studentCreateAccount", {
//                 message: "That username or email is already in use"
//             })
//
//         } else if (password !== confirmpassword) {
//             return res.render("studentCreateAccount", {
//                 message: "Passwords do not match"
//             })
//
//         }
//
//         let hashedPassword = await bcrypt.hash(password, 8);
//
//         db.query("INSERT INTO account SET ?", {fullname:fullname, username:username, email: email, password: hashedPassword, adminPerms: "0"}, (error,results)=>{
//             db.query("INSERT INTO student SET ?", {university:university, username:username, profile_description: "Edit Profile to Give Brief Description About Yourself"}, (error,results)=>{
//                 if (error){
//                     console.log(results);
//                     console.log(error);
//                 }
//             })
//
//             db.query("INSERT INTO preference SET ?", {username: username}, (error,results)=>{
//                 if (error){
//                     console.log(results);
//                     console.log(error);
//                 }
//             })
//
//             if (error){
//                 console.log(error);
//             }
//             else{
//                 console.log(results);
//                 var email = {
//                     from: 'LocalHost Staff, ohis@support.com',
//                     to: req.body.email,
//                     subject: 'Localhost Activation Link',
//                     text: 'Hello' + req.body.username + 'Thank you for registering at ohis@support.com. Please click on the following link below to complete your activation: http://localhost:5001/activate/' + req.body.temporarytoken ,
//                     html: 'Hello<strong>' + req.body.username + '</strong>,<br><br>Thank you for registering at ohis@support.com. Please click on the link below to complete your activation: <br><br><a href="http://localhost:5001/activate/' + req.body.temporarytoken + '">http://localhost:5001/activate/</a>'
//                 };
//
//                 client.sendMail(email, function(err, info){
//                     if (err ){
//                         console.log(error);
//                     }
//                     else {
//                         console.log('Message sent: ' + info.response);
//                     }
//                 });
//                 // return res.render("index", {
//                 //     message:"User registered"
//                 // });
//                 res.json({success: true, message: "Account registered. Please check email for activation link"});
//             }
//
//         })
//     });
// }

// exports.landlordCreateAccount = (req,res) => {
//     const {fullname, username, phone, password, email, confirmpassword} = req.body;
//
//     db.query("SELECT username,email FROM account WHERE username=? or email= ?", [username, email], async (error, results) => {
//         if (error) {
//             console.log(error);
//         }
//         if (results.length > 0) {
//             return res.render("landlordCreateAccount",{
//                 message: "That username or email is already in use"
//             })
//
//         }
//         else if(password!==confirmpassword) {
//             return res.render("landlordCreateAccount",{
//                 message: "Passwords do not match"
//             })
//
//         }
//
//         let hashedPassword = await bcrypt.hash(password, 8);
//
//         db.query("INSERT INTO account SET ?", {fullname:fullname, username:username, email: email, password: hashedPassword, adminPerms: "1"}, (error,results)=>{
//             db.query("INSERT INTO landlord SET ?", {phone:phone, username:username}, (error,results)=>{
//                 if (error){
//                     console.log(results);
//                     console.log(error);
//                 }
//             })
//             if (error){
//                 console.log(results);
//                 console.log(error);
//             }
//             else{
//                 console.log(results);
//                 return res.render("index", {
//                     message:"User registered"
//                 });
//             }
//         })
//     });
// }

