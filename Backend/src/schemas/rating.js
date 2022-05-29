const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema(
    {
        uId: {
            type: String,
            required: true,
        },
        movieId: {
            type: Number,
            required: true,
            index: true,
        },
        rating: {
            type: Number,
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

ratingSchema.index({ uId: 1, movieId: 1 });
module.exports = ratingSchema;
