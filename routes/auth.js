const express=require("express");
const authController=require("../controllers/auth")
const router=express.Router();

router.post("/studentCreateAccount", authController.studentCreateAccount)

//router.post("/", authController.index)
router.post("/landlordCreateAccount", authController.landlordCreateAccount)

module.exports = router;