require("../utils/db");
const User = require("../models/userHookless");
const Rating = require("../models/rating");
const csvtojson = require("csvtojson");

const driver = async () => {
    try {
        const ids = await csvtojson().fromFile(
            "/home/ankit/Desktop/Programming/Microsoft-Engage-Naina/data/Collaborative Filtering Dataset/dataset/links.csv"
        );
        const ratings = await csvtojson().fromFile(
            "/home/ankit/Desktop/Programming/Microsoft-Engage-Naina/data/Collaborative Filtering Dataset/dataset/ratings.csv"
        );
        const tmdbIds = {};
        ids.forEach((ele) => {
            tmdbIds[ele.movieId] = ele.tmdbId;
        });
        // console.log(tmdbIds);

        const users = await User.find();
        await Promise.all(
            ratings.map(async (ele) => {
                const movieId = +tmdbIds[ele.movieId];
                const uId = "random" + ele.userId.toString().padStart(3, "0");
                const rating = +ele.rating;
                const _obj = new Rating({ uId, movieId, rating });

                await _obj.save();
                for (let i = 0; i < users.length; ++i) {
                    if (users[i].uId == uId) {
                        users[i].ratings.push({ movieId, rating });
                        break;
                    }
                }
            })
        );
        await Promise.all(
            users.map(async (user) => {
                await user.save();
            })
        );

        console.log("Done");
    } catch (e) {
        console.log("Error encountered\nError: " + e);
    }
};

driver();
