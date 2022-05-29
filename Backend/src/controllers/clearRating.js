const express = require("express");

const User = require("../models/user");
const Rating = require("../models/rating");

const router = express.Router();

//req.body: uId
router.post("/clearRating", async (req, res) => {
  try {
    const user = await User.findOne({ uId: req.body.uId });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    user.ratings = [];
    await user.save();

    const count = await Rating.deleteMany({ uId: req.body.uId });

    return res.status(200).json({ success: true, count });
  } catch (e) {
    console.log("Error in POST clearRating at " + new Date());
    console.log("Error: " + e);
    res.status(500).json({ success: false, message: e.toString() });
  }
});

module.exports = router;
