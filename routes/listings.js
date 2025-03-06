const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const {isLoggedIn,isOwner,validatListings} = require("../middleware");
const listingController = require("../controllers/list");
const multer = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({storage});


//Index And Create Routes
router.route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single('listing[image]'),
    validatListings,
    wrapAsync(listingController.createListing)
    );
//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

//show , update and delete routes
router.route("/:id")
.get((wrapAsync(listingController.showListing)))
.put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validatListings,
    wrapAsync(listingController.updateListing)
)
.delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
);

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports = router;