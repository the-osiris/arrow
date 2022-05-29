const express = require("express");

const User = require("../models/user");
const Rating = require("../models/rating");
const auth = require("../middlewares/auth");

const router = express.Router();

//req.body: movieId, rating
router.post("/rateMovie", auth, async (req, res) => {
    try {
        const user = await User.findOne({ uId: req.token.sub }).select({
            password: 0,
        });

        let flag = 0;
        user.ratings.forEach((ele) => {
            if (ele.movieId === Number(req.body.movieId)) {
                ele.rating = +req.body.rating;
                flag = 1;
            }
        });
        if (flag) {
            const ele = await Rating.findOne({
                uId: req.token.sub,
                movieId: req.token.movieId,
            });
            if (ele.rating !== +req.body.rating) {
                ele.rating = +req.body.rating;
                await ele.save();
            }
        } else {
            user.ratings.push({
                movieId: req.body.movieId,
                rating: req.body.rating,
            });
            const ele = new Rating({
                uId: req.token.sub,
                movieId: req.body.movieId,
                rating: req.body.rating,
            });

            await ele.save();
        }

        await user.save();

        return res.status(200).json({ success: true, user });
    } catch (e) {
        console.log("Error in POST updateProfile at " + new Date());
        console.log("Error: " + e);
        res.status(500).json({ success: false, message: e.toString() });
    }
});

module.exports = router;
