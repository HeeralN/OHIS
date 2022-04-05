const mysql = require('mysql');
const jwt=require("jsonwebtoken");
const bcrypt = require("bcryptjs")

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,  //put ip address if not running on localhost
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

exports.studentCreateAccount = (req,res) => {
    //console.log(req.body);
    const {fullname, username, university, password, email, confirmpassword} = req.body;

    db.query("SELECT username, email FROM account WHERE username =? and email= ?", [username, email], async (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            return res.render("studentCreateAccount",{
                message: "That username or email is already in use"
            })

        } 
        else if(password!==confirmpassword) {
            return res.render("studentCreateAccount",{
                message: "Passwords do not match"
            })

        }

        db.query("INSERT INTO account SET ?", {fullname:fullname, username:username, email: email, password: password, adminPerms: "0"}, (error,results)=>{
            db.query("INSERT INTO student SET ?", {university:university, username:username, profile_description: "Edit Profile to Give Brief Description About Yourself"}, (error,results)=>{
                if (error){
                    console.log(results);
                    console.log(error);
                }
            })

            db.query("INSERT INTO preference SET ?", {username: username}, (error,results)=>{
                if (error){
                    console.log(results);
                    console.log(error);
                }
            })

            if (error){
                console.log(error);
            }
            else{
                console.log(results);
                return res.render("index", {
                    message:"User registered"
                });
            }
             
        })
    });
}

exports.landlordCreateAccount = (req,res) => {
    const {fullname, username, phone, password, email, confirmpassword} = req.body;

    db.query("SELECT username,email FROM account WHERE username=? and email= ?", [username, email], async (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            return res.render("landlordCreateAccount",{
                message: "That username or email is already in use"
            })

        }
        else if(password!==confirmpassword) {
            return res.render("landlordCreateAccount",{
                message: "Passwords do not match"
            })

        }

        db.query("INSERT INTO account SET ?", {fullname:fullname, username:username, email: email, password: password, adminPerms: "1"}, (error,results)=>{
            db.query("INSERT INTO landlord SET ?", {phone:phone, username:username}, (error,results)=>{
                if (error){
                    console.log(results);
                    console.log(error);
                }
            })
            if (error){
                console.log(results);
                console.log(error);
            }
            else{
                console.log(results);
                return res.render("index", {
                    message:"User registered"
                });
            }
        })
    });
}

// exports.propertySearch = (req,res) => {
//             con.connect(function(err) {
//                 if (err) throw err;
//                 con.query("SELECT * FROM Listings ORDER BY 'rental price' DESC", function (err, result) {
//                   if (err) throw err;
//                   console.log(result);
//                 });
//               });
//             }

// exports.index = (req,res) => {
//     const {username, password} = req.body;
//     if (username && password) {
//         db.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
//             if (results.length > 0) {
//                 req.session.loggedin = true;
//                 req.session.username = username;
//                 res.send('YAYY!');
//                 //res.redirect('/studentCreateAccount');
//             } else {
//                 res.send('Incorrect Username and/or Password!');
//             }
//             res.end();
//         });
//     } else {
//         res.send('Please enter Username and Password!');
//         res.end();
//     }
// }
