const Joi = require("joi");
const review = require("./models/review");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required().messages({
      "any.required": "Title is required",
      "string.empty": "Title cannot be empty",
    }),

    description: Joi.string().required().messages({
      "any.required": "Description is required",
      "string.empty": "Description cannot be empty",
    }),

    location: Joi.string().required().messages({
      "any.required": "Location is required",
    }),

    country: Joi.string().required().messages({
      "any.required": "Country is required",
    }),

    price: Joi.number().required().min(0).messages({
      "number.base": "Price must be a number",
      "any.required": "Price is required",
    }),

    image: Joi.string().allow("", null),
  }).required().messages({
    "any.required": "Listing object is required",
  }),
});


module.exports.reviewSchema = Joi.object({
  review:Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),    
  }).required(),
});