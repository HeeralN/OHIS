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

module.exports = router;