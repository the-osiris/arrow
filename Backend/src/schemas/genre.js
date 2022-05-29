const mongoose = require("mongoose");

const genreSchema = mongoose.Schema(
    {
        genreTitle: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = genreSchema;
