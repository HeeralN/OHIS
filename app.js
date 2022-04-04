const express = require('express');
const app = express();
const mysql = require('mysql');
const session = require('express-session');
const dotenv= require("dotenv");
const path = require("path")
const bodyParser = require("body-parser");
const { CLIENT_FOUND_ROWS } = require('mysql/lib/protocol/constants/client');
const { NULL } = require('mysql/lib/protocol/constants/types');
const { count } = require('console');

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

app.get('/adminLanding', function(req, res) {
    if (req.session.loggedin) {
        var listingData = null;
        var signupData = null;
        db.query('SELECT a.username, a.fullname, COUNT(*) AS numListings, CASE WHEN a.adminPerms = 0 THEN \'Student\' WHEN a.adminPerms = 1 THEN \'Landlord\' END AS accountType FROM account a INNER JOIN listing l ON a.username = l.username GROUP BY l.username ORDER BY COUNT(*) DESC LIMIT 10', function(error, results, fields) {
            listingData = results;
            db.query('SELECT DATE_FORMAT(date_registered, \'%W %m/%d/%Y\') AS date, COUNT(*) AS numAccountsRegistered FROM account GROUP BY DATE(date_registered) ORDER BY date_registered DESC LIMIT 7', function(error, results, fields) {
                signupData = results;

                if (listingData && signupData) {
                    return res.render('adminLanding', {listingData: listingData, signupData: signupData});
                }
                else {
                    return res.render('adminLanding', {message: 'There was an error fetching statistics!'});
                }
            });
        });
        //return res.render('adminLanding', {listingData: listingData, signupData: signupData});
        //res.render('adminLanding');
    } else {
        res.send('Please login to view this page!');
    }
});

app.get('/adminManagingListings', function(req, res) {
    if (req.session.loggedin) {
        res.render('adminManagingListings');
    } else { 
        res.send('Please login to view this page!');
    }
}); 

app.get('/adminManagingUsers', function(req, res) {
    if (req.session.loggedin) {
        res.render('adminManagingUsers');
    } else { 
        res.send('Please login to view this page!');
    }
});



app.post('/adminManagingListings/getListing', function(req, res) {
    const housingId = req.body.listingID;

    if (housingId) {
        db.query('SELECT listingId, address, username, date_created, last_modified, link, description FROM listing WHERE listingId = ?', [housingId], function(error, results, fields) {
            if (results.length > 0) {
                return res.render('adminManagingListings', {listingId: results[0].listingId, address: results[0].address, username: results[0].username, date_created: results[0].date_created, last_modified: results[0].last_modified, link: results[0].link, description: results[0].description});
            } else {
                return res.render('adminManagingListings', {message: 'Listing not found!'});
            }
            res.end();
        });
    }
    else {
        return res.render('adminManagingListings', {message: 'Please enter a value!'}); 
    }
});

app.post('/adminManagingListings/deleteListing', function(req, res) {
    const housingId = req.body.listingID;

    if (housingId) {
        db.query('DELETE FROM listing WHERE listingId = ?', [housingId], function(error, results, fields) {
            if (results && error === null) {
                return res.render('adminManagingListings', {message: 'Listing deleted!'});
            } else {
                return res.render('adminManagingListings', {message: 'There was an error deleting this listing! It may have been deleted already.'});
            }
            res.end();
        });
    }
    else {
        return res.render('adminManagingListings', {message: 'Please enter a value!'});
    }
});

app.post('/adminManagingUsers/getUser', function(req, res) {
    const userId = req.body.username;

    if (userId) {
        db.query('SELECT username, email, fullname, adminPerms FROM account WHERE username = ? AND username != ?', [userId, req.session.username], function(error, results, fields) {
            if (results && results.length > 0) {
                return res.render('adminManagingUsers', {username: results[0].username, email: results[0].email, fullname: results[0].fullname, adminPerms: results[0].adminPerms});
            } else {
                return res.render('adminManagingUsers', {message: 'User not found!'});
            }
            res.end();
        });
    }
    else {
        return res.render('adminManagingUsers', {message: 'Please enter a value!'});
    }
});

app.post('/adminManagingUsers/deleteUser', function(req, res) {
    const userId = req.body.username;
    
    if (userId) {
        db.query('DELETE FROM account WHERE username = ?', [userId], function(error, results, fields) {
            console.log(results[0]);
            if (results && error === null) {
                return res.render('adminManagingUsers', {message: 'User deleted!'});
            } else {
                return res.render('adminManagingUsers', {message: 'There was an error deleting this user! They may have been deleted already.'});
            }
            res.end();
        });
    }
    else {
        return res.render('adminManagingUsers', {message: 'Please enter a value!'});
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
                res.render("studentProfile", {fullname: student[0].fullname, email: student[0].email, university: student[0].university});
            })
        });
    } else {
        res.redirect('/');
    } 
});

 
app.get('/roommateMatchingForm', (req, res)=>{
    if (req.session.loggedin) {
        db.query("SELECT * FROM preference WHERE username =?", [req.session.username], (error, result) => {
            if (error){
                console.log(result);
                console.log(error);
            }
            console.log(result);
            res.render("roommateMatchingForm", {gender: result[0].gender, international: result[0].international, smoker: result[0].smoker, roomcare: result[0].roomcare, bedtime: result[0].bedtime, sleephabit: result[0].sleephabit, personality: result[0].personality, studyhabit: result[0].studyhabit, musicvol: result[0].musicvol}); 
        });
    } else {
        res.redirect('/'); 
    }
});


app.get('/landlordProfile', function(req, res) {
    if (req.session.loggedin) {
        //res.send('Welcome back, ' + req.sess ion.username + '!');
        res.render("landlordProfile");
    } else {
        res.redirect('/');
    }
});

app.get('/resetPassword', function(req, res) {
        res.render("resetPassword");

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

app.post("/resetPassword", (req ,res) => {
    const {username, password, confirmpassword} = req.body;
    if (username && password) {
        db.query('SELECT username FROM account WHERE username = ?', [username], function(error, results) {
            if (results.length > 0) {
                db.query('UPDATE account SET ? WHERE username = ?', [{password: password}, username], function (error, results) {
                    if (error) {
                        console.log(error);
                    } else if (password !== confirmpassword) {
                        return res.render("resetPassword", {
                            message: "Passwords do not match"
                        })

                    } else {
                        return res.render("index", {
                            message: "Password is updated"
                        })
                    }
                });

            } else {
                return res.render("index",{
                    message: "Username does not exist"
                });
            }
        });
    } else {
        return res.render("studentCreateAccount",{
            message: "Incorrect Username and/or Password"
        });
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

app.post('/housingProfile', function(req, res) {
    const housingId = req.body.listingId;
    console.log("ID: " + housingId);
    var restrictionBool = null;
    var gymBool = null;
    var poolBool = null;
    var laundryBool = null;
    var parkingBool = null; 
    var furnishedBool = null;
    var dishwasherBool = null;
    var hardwood_floorsBool = null;
    var carpeted_floorsBool = null;
    db.query('SELECT listingId, address, username, square_feet, bath, number_of_room, rental_price, restriction, gym, pool, laundry, parking, furnished, dishwasher, hardwood_floors, carpeted_floors, description FROM listing WHERE listingId = ?',[housingId], function(error, results, fields) {
            if(results[0].restriction){
                restrictionBool = "Pets allowed";
            }
            else{
                restrictionBool = "Pets not allowed";
            }
            if(results[0].gym){
                gymBool = "Gym";
            }
            else{
                gymBool = "No gym";
            }
            if(results[0].pool){
                poolBool = "Pool";
            }
            else{
                poolBool = "No pool";
            }
            if(results[0].laundry){
                laundryBool = "Laundry";
            }
            else{
                laundryBool = "No laundry";
            }
            if(results[0].parking){
                parkingBool = "Parking on premises";
            }
            else{
                parkingBool = "No parking included";
            }
            if(results[0].furnished){
                furnishedBool = "Furnished";
            }
            else{
                furnishedBool = "Unfurnished";
            }
            if(results[0].dishwasher){
                dishwasherBool = "Dishwasher";
            }
            else{
                dishwasherBool = "No dishwasher";
            }
            if(results[0].hardwood_floors){
                hardwood_floorsBool = "Hardwood floors";
            }
            else{
                hardwood_floorsBool = "No hardwood floors";
            }
            if(results[0].carpeted_floors){
                carpeted_floorsBool = "Carpeted floors";
            }
            else{
                carpeted_floorsBool = "No carpeted floors";
            }
            return res.render('housingProfile', {listingId: results[0].listingId, address: results[0].address, username: results[0].username, square_feet: results[0].square_feet, bath: results[0].bath, number_of_room: results[0].number_of_room, rental_price: results[0].rental_price, restriction: restrictionBool, gym: gymBool, pool: poolBool, laundry: laundryBool, parking: parkingBool, furnished: furnishedBool, dishwasher: dishwasherBool, hardwood_floors: hardwood_floorsBool, carpeted_floors: carpeted_floorsBool, description: results[0].description}); 
              
        res.end();
    });
});


app.post('/housingProfileForLandlords/getListing', function(req, res) {
    const housingId = req.body.listingID;
    console.log("ID: " + housingId);
    db.query('SELECT listingId, address, user email, bath, number of room FROM listing WHERE listingId = ?', [housingId], function(error, results, fields) {
        if (results) {
            return res.render('housingProfileForLandlords', {listingID: results[0].listingId, address: results[0].address, email: results[0].user_email, bath: results[0].bath, number_of_room: results[0].number_of_room, description: results[0].description});
        } else {
            return res.render('housingProfileForLandlords', {message: 'Listing not found!'});
        }
        res.end();
    });
});

app.get('/propertySearch', function(req, res) {
    if (req.session.loggedin) {
    db.query('SELECT listingId, address, bath, number_of_room FROM listing', function(error, results, fields) {
        if(error){
            console.log(error);
        }
        var properties = results;
        if (properties) {
          return res.render('propertySearch', {properties: properties});
        } else {
            return res.render('propertySearch', {message: 'Listings not found!'});
        }
        res.end();
    });
}
else {
    res.send('Please login to view this page!');
}
});

app.post('/propertySearch/sort', function(req, res) {

    var {groupSize, dishwasher, parking, pool, laundry, gym, length1, length3, length6, length12, length13, length2} = req.body;
    if (req.session.loggedin) {
        var queryString = "WHERE "
        var count = 0;
        if(dishwasher==1){
            if(count>0){
                queryString += " AND ";
            }
            queryString+="dishwasher = 1";
            count++;
        }
        if(parking==1){
            if(count>0){
                queryString += " AND ";
            }
            queryString+="parking = 1";
            count++;
        }
        if(pool==1){
            if(count>0){
                queryString += " AND ";
            }
            queryString+="pool = 1";
            count++;
        }
        if(laundry==1){
            if(count>0){
                queryString += " AND ";
            }
            queryString+="laundry = 1";
            count++;
        }
        if(gym==1){
            if(count>0){
                queryString += " AND ";
            }
            queryString+="gym = 1";
            count++;
        }
        if(groupSize==1){
            if(count>0){
                queryString += " AND ";
            }
            console.log("in case 1");
            queryString += "number_of_room = 1";
            count++;
        }
        else if(groupSize==2){
            if(count>0){
                queryString += " AND ";
            }
            console.log("in case 2");
            queryString += "number_of_room > 1 AND number_of_room < 5";
            count++;
        }
        else{
            if(count>0){
                queryString += " AND ";
            }
            console.log("in case 3");
            queryString += "number_of_room >= 5";
            count++;
        }
        console.log("SELECT listingId, address, bath, number_of_room FROM listing " + queryString);
    db.query('SELECT listingId, address, bath, number_of_room FROM listing ' + queryString, function(error, results, fields) {
        if(error){
            console.log(error);
        }
        var properties = results;
        if (properties) {
          return res.render('propertySearch', {properties: properties});
        } else {
            return res.render('propertySearch', {message: 'Listings not found!'});
        }
        res.end();
    });
}
else {
    res.send('Please login to view this page!');
}
});

app.get('/propertySearch/sort1', function(req, res) {
    if (req.session.loggedin) {
    db.query('SELECT listingId, address, bath, number_of_room, rental_price FROM listing ORDER BY rental_price', function(error, results, fields) {
        console.log(results);
        if(error){
            console.log(error);
        }
        var properties = results;
        if (properties) {
          return res.render('propertySearch', {properties: properties});
        } else {
            return res.render('propertySearch', {message: 'Listings not found!'});
        }
        res.end();
    });
}
else {
    res.send('Please login to view this page!');
}
});

app.get('/propertySearch/sort2', function(req, res) {
    if (req.session.loggedin) {
    db.query('SELECT listingId, address, bath, number_of_room, rental_price FROM listing ORDER BY rental_price DESC', function(error, results, fields) {
        if(error){
            console.log(error);
        }
        var properties = results;
        if (properties) {
          return res.render('propertySearch', {properties: properties});
        } else {
            return res.render('propertySearch', {message: 'Listings not found!'});
        }
        res.end();
    });
}
else {
    res.send('Please login to view this page!');
}
});

app.post('/propertySearchLandlords/sort', function(req, res) {

    var {groupSize, dishwasher, parking, pool, laundry, gym, length1, length3, length6, length12, length13, length2} = req.body;
    if (req.session.loggedin) {
        var queryString = "WHERE "
        var count = 0;
        if(dishwasher==1){
            if(count>0){
                queryString += " AND ";
            }
            queryString+="dishwasher = 1";
            count++;
        }
        if(parking==1){
            if(count>0){
                queryString += " AND ";
            }
            queryString+="parking = 1";
            count++;
        }
        if(pool==1){
            if(count>0){
                queryString += " AND ";
            }
            queryString+="pool = 1";
            count++;
        }
        if(laundry==1){
            if(count>0){
                queryString += " AND ";
            }
            queryString+="laundry = 1";
            count++;
        }
        if(gym==1){
            if(count>0){
                queryString += " AND ";
            }
            queryString+="gym = 1";
            count++;
        }
        if(groupSize==1){
            if(count>0){
                queryString += " AND ";
            }
            console.log("in case 1");
            queryString += "number_of_room = 1";
            count++;
        }
        else if(groupSize==2){
            if(count>0){
                queryString += " AND ";
            }
            console.log("in case 2");
            queryString += "number_of_room > 1 AND number_of_room < 5";
            count++;
        }
        else{
            if(count>0){
                queryString += " AND ";
            }
            console.log("in case 3");
            queryString += "number_of_room >= 5";
            count++;
        }
        console.log("SELECT listingId, address, bath, number_of_room FROM listing " + queryString);
    db.query('SELECT listingId, address, bath, number_of_room FROM listing ' + queryString, function(error, results, fields) {
        if(error){
            console.log(error);
        }
        var properties = results;
        if (properties) {
          return res.render('propertySearch', {properties: properties});
        } else {
            return res.render('propertySearch', {message: 'Listings not found!'});
        }
        res.end();
    });
}
else {
    res.send('Please login to view this page!');
}
});

app.get("/logout",(req,res)=>{
    req.session.destroy((err) => {
        if(err){
            return  console.error(err)
        }
        console.log("The session has been destroyed!")
        res.redirect("/");
    }) 
});

app.get("/roommateMatchingFormEdit", (req, res) => {
    if (req.session.loggedin) {
        res.render("roommateMatchingFormEdit");
    } else {
        res.redirect('/');
    }
});
 

app.post("/roommateMatchingFormEdit", (req, res) => {
    console.log(req.body);
    console.log(req.session);
    const {gender, international, smoker, roomcare, bedtime, sleephabit, personality, studyhabit, musicvol} = req.body;
    db.query("UPDATE preference SET ? WHERE username = ?", [{gender: gender, international: international, smoker: smoker, roomcare: roomcare, 
        bedtime:bedtime, sleephabit:sleephabit, personality:personality, studyhabit:studyhabit, musicvol:musicvol}, req.session.username],
        async (error, results) => {
            if (error) {
                console.log(error);
            }   
            else{ 
                console.log(results);
                return res.redirect("/roommateMatchingForm");
            }
        });
        
});

