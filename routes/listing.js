const express=require('express');
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} =require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer')
const {storage}=require("../cloudconfig.js")
const upload = multer({ storage })


router.route("/")
        .get(wrapAsync(listingController.index))
         .post(isLoggedIn,upload.single('listing[image][url]'),validateListing,wrapAsync(listingController.createListing));

          //NEW ROUTE
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listings/new",{
        category:req.query.category
    });
});
router.get("/search", wrapAsync(listingController.searchListings));

router.route("/:id")
        .get(wrapAsync(listingController.showListing))
        .put(isLoggedIn,isOwner,upload.single('listing[image][url]'),validateListing,wrapAsync(listingController.updateListing))
        .delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));


        //Edit Route
   router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));


 module.exports=router;







































































        //post route
    // let {title,description,image,price,location,country}=req.body;  or 
    // let listing=req.body.listing;
    // try {
    // if(!req.body?.listing) {
    //     throw new ExpressError(400,"Send valid data for lisitng");
    // }

     // }catch(err) {
    //     next(err);
    // }

    //update route

    //     if(!req.body.listing) {
    //     throw new ExpressError(400,"Send valid adata for lisitng");
    // }