const mysql = require('mysql');
const jwt=require("jsonwebtoken");
const bcrypt = require("bcryptjs")

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,  //put ip address if not running on localhost
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

exports.createListingPage = (req,res) => {
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

    //res.send("Form submitted")
    // res.json({ //to test form on front end
    //
    // })
}