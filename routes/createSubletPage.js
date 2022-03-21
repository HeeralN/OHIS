const express=require("express");
const subletController=require("../controllers/createSubletPage")
const router=express.Router();

router.post("/createSubletPage", subletController.createSubletPage)

module.exports = router;