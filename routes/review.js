const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {validateReview,isLoggedIn,isReviewOwner} =require("../middleware.js");
const reviewController=require("../controllers/review.js");

    //post Route
    router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

        // Delete Review Route
    router.delete("/:reviewId",isLoggedIn,isReviewOwner,wrapAsync(reviewController.deleteReview));
       
 module.exports=router;
