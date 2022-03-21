const express=require("express");
const listingController=require("../controllers/createListingPage")
const router=express.Router();

router.post("/createListingPage", listingController.createListingPage)

module.exports = router;