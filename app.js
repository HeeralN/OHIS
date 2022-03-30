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
        db.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                //res.send("YAYYY!")
                res.redirect('/studentProfile');
            } else {
                res.send('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});

app.get('/studentProfile', function(req, res) {
    if (req.session.loggedin) {
        //res.send('Welcome back, ' + req.session.username + '!');
        res.render("studentProfile");
    } else {
        res.redirect('/');
    }
    //res.end();
});

app.get('/landlordProfile', function(req, res) {
    if (req.session.loggedin) {
        //res.send('Welcome back, ' + req.session.username + '!');
        res.render("landlordProfile");
    } else {
        res.redirect('/');
    }
    //res.end();
});

app.get("/createListingPage",(req,res)=>{
    if (req.session.loggedin) {
        //res.send('Welcome back, ' + req.session.username + '!');
        res.render("createSubletPage");
    } else {
        res.redirect('/');
    }
});

app.get("/createSubletPage",(req,res)=>{
    if (req.session.loggedin) {
        //res.send('Welcome back, ' + req.session.username + '!');
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

app.post('/housingProfile/getListing', function(req, res) {
    const housingId = req.body.listingID;
    db.query('SELECT listingId, address, user email, bath, number of room, description FROM listing WHERE listingId = ?', [housingId], function(error, results, fields) {
        if (results.length > 0) {
            return res.render('housingProfile', {listingID: results[0].listingId, address: results[0].address, email: results[0].user_email, bath: results[0].bath, number_of_room: results[0].number_of_room, description: results[0].description});        } else {
            return res.render('housingProfile', {message: 'Listing not found!'});
        }
        res.end();
    });
});

app.post('/housingProfileForLandlords/getListing', function(req, res) {
    const housingId = req.body.listingID;
    db.query('SELECT listingId, address, user email, bath, number of room, description FROM listing WHERE listingId = ?', [housingId], function(error, results, fields) {
        if (results.length > 0) {
            return res.render('housingProfileForLandlords', {listingID: results[0].listingId, address: results[0].address, email: results[0].user_email, bath: results[0].bath, number_of_room: results[0].number_of_room, description: results[0].description});
        } else {
            return res.render('housingProfileForLandlords', {message: 'Listing not found!'});
        }
        res.end();
    });
});

app.post('/propertySearch/getListings', function(req, res) {
    const housingId = req.body.listingID;
    db.query('SELECT listingId, address, user email, bath, number of room, description FROM listing', function(error, results, fields) {
        if (results.length > 0) {
            return res.render('propetySearch', {listingID: results[0].listingId, address: results[0].address, email: results[0].user_email, bath: results[0].bath, number_of_room: results[0].number_of_room, description: results[0].description});
        } else {
            return res.render('propertySearch', {message: 'Listings not found!'});
        }
        res.end();
    });
});
