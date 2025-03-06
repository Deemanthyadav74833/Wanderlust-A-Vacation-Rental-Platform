const Listing =require("./models/listing");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in to create a listing!");
        return res.redirect("/login");
    }
    next();
}

module.exports.savedRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req, res, next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You dont have access to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validatListings = (req,res,next)=>{
    const { error } = listingSchema.validate(req.body, { abortEarly: false });
    if (error) {
        let errMsg = error.details.map((err)=>err.message).join(",");
        throw new ExpressError(errMsg,400);
    }else{
        next();
    }
};


module.exports.validatReview = (req,res,next)=>{
    const { error } = reviewSchema.validate(req.body, { abortEarly: false });
  
    if (error) {
        let errMsg = error.details.map((err)=>err.message).join(",");
        throw new ExpressError(errMsg,400);
    }else{
        next();
    }
};

module.exports.isReviewAuthor = async(req, res, next)=>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You did not created this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}