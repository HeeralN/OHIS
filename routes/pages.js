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

router.get("/createListingPage",(req,res)=>{
    res.render("createListingPage");
});

router.get("/createSubletPage",(req,res)=>{
    res.render("createSubletPage");
});

router.get("/viewStudentSublet",(req,res)=>{
    res.render("viewStudentSublet");
});

module.exports = router;