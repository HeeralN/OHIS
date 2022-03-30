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

exports.createListingPage = (req ,res) => {
    //console.log(req.body);
    const {email, street, inputCity, inputState, inputZip, inputCountry, buildingWebsite, descriptionOfListing, squareFeet, numberOfBath, numTotalRooms, 
        occupancyDate, leaseType, rentalRate, restrictions, gym, pool,laundry, parking, furnished, dishwasher, hardwoodFloors, carpetedFloors} = req.body;
     
    let fullAddress = street + ' ' + inputCity + ' ' + inputState + ' ' + inputZip + ' ' + inputCountry;
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // checking to make sure primary key address doesn't already exist
    db.query("SELECT address FROM listing WHERE address= ?", [fulladdress], async (error, results) => {
        if (error) {
            console.log(error);
        }
        if (results.length > 0) {
            return res.render("createListingPage",{
                message: "A listing at the given address already exists"
            })
        }  
        let query = "INSERT INTO listing (address, user email, date created, last modified, link, description, square feet, bath, number of rooms, occupancy date,"+
            " lease type, rental price, restrictions, gym, pool, laundry, parking, furnished, dishwasher, hardwood floors, carpeted floors) VALUES ?;"
        let values = [fullAddress, email, date, date, buildingWebsite, descriptionOfListing, squareFeet, numberOfBath, numTotalRooms, occupancyDate, leaseType, 
            rentalRate, restrictions, gym, pool,laundry, parking, furnished, dishwasher, hardwoodFloors, carpetedFloors]
        
        db.query(query, values, (error,results)=>{
            if (error){
                console.log(error);
            }
            else{
                console.log(results);
                return res.render("createListingPage", {
                    message:"Listing posted"
                });
            }
        })
    });

}


exports.createSubletPage = (req,res) => {
    //console.log(req.body);
    const {email, street, inputCity, inputState, inputZip, inputCountry, buildingWebsite, descriptionOfListing, squareFeet, numberOfBath, numTotalRooms, 
        occupancyDate, leaseType, rentalRate, restrictions, gym, pool,laundry, parking, furnished, dishwasher, hardwoodFloors, carpetedFloors} = req.body;
     
    let fullAddress = street + ' ' + inputCity + ' ' + inputState + ' ' + inputZip + ' ' + inputCountry;
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // checking to make sure primary key address doesn't already exist
    db.query("SELECT address FROM listing WHERE address= ?", [fulladdress], async (error, results) => {
        if (error) {
            console.log(error);
        }   
        if (results.length > 0) {
            return res.render("createSubletPage",{
                message: "A listing at the given address already exists"
            }) 
        } 
        let query = "INSERT INTO listing (address, user email, date created, last modified, link, description, square feet, bath, number of rooms, occupancy date,"+
            " lease type, rental price, restrictions, gym, pool, laundry, parking, furnished, dishwasher, hardwood floors, carpeted floors) VALUES ?;"
        let values = [fullAddress, email, date, date, buildingWebsite, descriptionOfListing, squareFeet, numberOfBath, numTotalRooms, occupancyDate, leaseType, 
            rentalRate, restrictions, gym, pool,laundry, parking, furnished, dishwasher, hardwoodFloors, carpetedFloors]
        
        db.query(query, values, (error,results)=>{
            if (error){
                console.log(error);
            }
            else{
                console.log(results);
                return res.render("createSubletPage", {
                    message:"Listing posted"
                });
            }
        })
    });

    //res.send("Form submitted")
    // res.json({ //to test form on front end
    //
    // })
}


exports.landlordCreateAccount = (req,res) => {
    //console.log(req.body);
    const {fullname, username, phone, password, email, confirmpassword} = req.body;

    db.query("SELECT email FROM LandlordLogin WHERE email= ?", [username], async (error, results) => {
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
        //let hashedPassword = await bcrypt.hash(password, 8); //hashes the password for encryption
        //console.log(hashedPassword);

        db.query("INSERT INTO LandlordLogin SET ?", {fullname:fullname, username:username, phone: phone, email: email, password: password}, (error,results)=>{
            if (error){
                console.log(results);
                console.log(error);
            }
            else{
                console.log(results);
                return res.render("landlordCreateAccount", {
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