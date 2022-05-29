const mongoose = require("mongoose");
const genreSchema = require("../schemas/genre");

module.exports = mongoose.model("genre", genreSchema);
