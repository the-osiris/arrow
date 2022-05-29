const mongoose = require("mongoose");
const movieSchema = require("../schemas/movie");

module.exports = mongoose.model("movie", movieSchema);
