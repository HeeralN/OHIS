const express=require("express");
const authController=require("../controllers/auth")
const router=express.Router();

router.post("/studentCreateAccount", authController.studentCreateAccount)

//router.post("/", authController.index)

module.exports = router;