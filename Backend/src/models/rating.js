const mongoose = require("mongoose");
const ratingSchema = require("../schemas/rating");

module.exports = mongoose.model("rating", ratingSchema);
