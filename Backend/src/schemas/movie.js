const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
            index: true,
        },
        genre: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = movieSchema;
