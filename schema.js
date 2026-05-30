const joi = require('joi');

const CATEGORIES = ["Trending","Rooms","Iconic cities","Mountains","Castles","Amazing Pools","Camping","Farms","Arctic","Domes","Boats"];

module.exports.listingSchema = joi.object({
    listing : joi.object({
      title:joi.string().required(),
      description:joi.string().required(),
      location:joi.string().required(),
      country:joi.string().required(),
      price:joi.number().required(),
      category:joi.string().valid(...CATEGORIES).required(),
      image: joi.object({
            filename: joi.string().allow("", null).empty(''),
            url: joi.string().allow("", null).empty('')
        }).allow("", null)
    }).required(),
});

module.exports.reviewSchema=joi.object({
    review:joi.object({
        rating:joi.number().required().min(1).max(5),
        comment:joi.string().required(),
    }).required(),
});
