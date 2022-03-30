const express = require('express');
const app = express();
const mysql = require('mysql');
const session = require('express-session');
const dotenv= require("dotenv");
const path = require("path")
const bodyParser = require("body-parser");

dotenv.config({path: './.env'})

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,  //put ip address if not running on localhost
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

const publicDirectory = path.join(__dirname, "./public")//put css or javascript for frontend
app.use(express.static(publicDirectory))

//parse URL-encoded bodies (as sent by html forms)
app.use(express.urlencoded({extended:false}));
//parse JSON bodies (as sent by API clients)
app.use(express.json());


app.set("view engine", "hbs");

db.connect((error)=> {
    if(error) {
        console.log(error)
    }
    else{
        console.log("MY SQL Connected..")
    }
})

//Define Routes
app.use("/", require("./routes/pages"))
app.use("/auth", require("./routes/auth"));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 *60 * 60 *24 }
}));


app.listen(5001, () => {
    console.log("Sever started on Port 5001")
});

// app.get("/",(req,res)=>{
//     res.render("index");
// });
//
// app.get("/landlordCreateAccount",(req,res)=>{
//     res.render("landlordCreateAccount");
// });
//
// app.get("/studentCreateAccount",(req,res)=>{
//     res.render("studentCreateAccount");
// });

app.post('/auth/index', function(req, res) {
    const {username, password} = req.body;
    if (username && password) {
        db.query('SELECT username,password,adminPerms FROM account WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                if (results[0].adminPerms === 0) {  //0 is for student
                    res.redirect("/studentProfile");
                }
                else if (results[0].adminPerms === 1) {   //1 is for landlord
                    res.redirect('/landlordProfile');
                }
                else if (results[0].adminPerms === 2) {    //2 is for admin
                    res.redirect('/adminLanding');
                }

            } else {
                return res.render("index",{
                    message: "Incorrect Username and/or Password"
                });
            }
        });
    } else {
        return res.render("studentCreateAccount",{
            message: "Incorrect Username and/or Password"
        });
    }
});

app.get('/studentProfile', function(req, res) {
    if (req.session.loggedin) {
        // db.query("SELECT fullname, email FROM account WHERE username =?", [req.session.username], async (error, results) => {
        //     res.render("studentProfile", {account: results});
        // });
        db.query("SELECT fullname, email FROM account WHERE username =?", [req.session.username], (error, student) => {
            db.query("SELECT university, profile_description FROM student WHERE username=?", [req.session.username], (error, university)=>{
                if (error){
                    console.log(student);
                    console.log(error);
                }
                res.render("studentProfile", {fullname: student[0].fullname, email: student[0].email, university: university[0].university, profile_description: university[0].profile_description});
            })
        });
    } else {
        res.redirect('/');
    }
});


app.get('/landlordProfile', function(req, res) {
    if (req.session.loggedin) {
        //res.send('Welcome back, ' + req.session.username + '!');
        res.render("landlordProfile");
    } else {
        res.redirect('/');
    }
});

//not rendering username, fullname and university?
app.get("/editStudentProfile",(req,res)=>{
    if (req.session.loggedin) {
        // db.query("SELECT fullname, email FROM account WHERE username =?", [req.session.username], async (error, results) => {
        //     res.render("studentProfile", {account: results});
        // });
        db.query("SELECT fullname, email FROM account WHERE username =?", [req.session.username], (error, student) => {
            db.query("SELECT university,profile_description FROM student WHERE username=?", [req.session.username], (error, university)=>{
                if (error){
                    console.log(student);
                    console.log(error);
                }
                res.render("editStudentProfile", {fullname: student[0].fullname, email: student[0].email, university: university[0].university, profile_description: university[0].profile_description});
            })
        });
    } else {
        res.redirect('/');
    }
});

app.post("/editStudentProfile", (req ,res) => {
    if (req.session.loggedin) {
        const {editProfile}=req.body;
        db.query('UPDATE student SET ? WHERE username = ?', [{ profile_description: editProfile }, req.session.username], (error,results)=>{
            if (error){
                console.log(results);
                console.log(results);
            }
            db.query("SELECT fullname, email FROM account WHERE username =?", [req.session.username], (error, student) => {
                db.query("SELECT university,profile_description FROM student WHERE username=?", [req.session.username], (error, university)=>{
                    if (error){
                        console.log(student);
                        console.log(error);
                    }
                    res.render("studentProfile", {fullname: student[0].fullname, email: student[0].email, university: university[0].university, profile_description: university[0].profile_description});
                })
            });

        });
    }
    else {
        res.redirect('/');
    }

});

app.get("/createListingPage",(req,res)=>{
    if (req.session.loggedin) {
        res.render("createSubletPage");
    } else {
        res.redirect('/');
    }
});

app.get("/createSubletPage",(req,res)=>{
    if (req.session.loggedin) {
        res.render("createSubletPage");
    } else {
        res.redirect('/');
    }
});

app.get("/viewStudentSublet",(req,res)=>{
    if (req.session.loggedin) {
        //res.send('Welcome back, ' + req.session.username + '!');
        res.render("viewStudentSublet");
    } else {
        res.redirect('/');
    }
});

app.get("/logout",(req,res)=>{
    req.session.destroy((err) => {
        if(err){
            return console.error(err)
        }
        console.log("The session has been destroyed!")
        res.redirect("/");
    })
});