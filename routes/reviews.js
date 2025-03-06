const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const Review = require("../models/review");
const ExpressError = require("../utils/ExpressError");
const {validatReview, isLoggedIn,isReviewAuthor} = require("../middleware");
const reviewController = require("../controllers/rev");

//Reviews
//Post Route
router.post("/",isLoggedIn,validatReview,wrapAsync(reviewController.createReview));

//Review Delete Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports =  router;