//controller not working with index page

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

    db.query("SELECT email FROM login WHERE email= ?", [username], async (error, results) => {
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
        //let hashedPassword = await bcrypt.hash(password, 8); //hashes the password for encryption
        //console.log(hashedPassword);

        db.query("INSERT INTO login SET ?", {fullname:fullname, username:username, university: university, email: email, password: password}, (error,results)=>{
            if (error){
                console.log(error);
            }
            else{
                console.log(results);
                return res.render("studentCreateAccount", {
                    message:"User registered"
                });
            }
        })
    });

    //res.send("Form submitted")
    // res.json({ //to test form on front end
    //
    // })
}
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