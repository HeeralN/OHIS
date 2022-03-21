const express=require("express");

const router=express.Router();

router.get("/",(req,res)=>{
    res.render("index");
});

router.get("/landlordCreateAccount",(req,res)=>{
    res.render("landlordCreateAccount");
});

router.get("/studentCreateAccount",(req,res)=>{
    res.render("studentCreateAccount");
});

// router.get('/studentProfile', function(request, response) {
//     if (request.session.loggedin) {
//         response.send('Welcome back, ' + request.session.username + '!');
//     } else {
//         response.send('Please login to view this page!');
//     }
//     response.end();
// });

router.get("/createListingPage",(req,res)=>{
    res.render("createListingPage");
});

router.get("/createSubletPage",(req,res)=>{
    res.render("createSubletPage");
});


module.exports = router;