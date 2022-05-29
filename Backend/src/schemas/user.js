const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        uId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            // required: true,
        },
        photoUrl: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            index: true,
        },
        emailValidation: {
            type: mongoose.Schema.Types.Boolean,
            index: true,
            default: false,
        },
        dob: {
            type: Date,
            required: false,
        },
        gender: {
            type: String,
            required: false,
        },
        password: {
            type: String,
            required: true,
        },
        preferences: [
            {
                type: String,
            },
        ],
        ratings: [
            {
                movieId: {
                    type: Number,
                    required: true,
                },
                rating: {
                    type: Number,
                    required: true,
                },
            },
        ],
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
                geoData: {
                    type: new mongoose.Schema(
                        {
                            ip: {
                                type: String,
                                // required: true,
                            },
                            latitude: {
                                type: String,
                                // required: true,
                            },
                            longitude: {
                                type: String,
                                // required: true,
                            },
                            city: {
                                type: String,
                                // required: true,
                            },
                            region: {
                                type: String,
                                // required: true,
                            },
                            country: {
                                type: String,
                                // required: true,
                            },
                            countryCode: {
                                type: String,
                                // required: true,
                            },
                        },
                        { strict: false, timestamps: true }
                    ),
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = userSchema;
