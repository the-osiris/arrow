const express = require("express");

const User = require("../models/user");
const auth = require("../middlewares/auth");

const router = express.Router();

//req.body: name, gender, dob, preferences
router.post("/updateProfile", auth, async (req, res) => {
    try {
        const user = await User.findOne({ uId: req.token.sub }).select({
            password: 0,
            ratings: 0,
        });
        user.name = req.body.name;
        user.gender = req.body.gender;
        user.dob = req.body.dob;
        user.preferences = req.body.preferences;

        await user.save();

        return res.status(200).json({ success: true, user });
    } catch (e) {
        console.log("Error in POST updateProfile at " + new Date());
        console.log("Error: " + e);
        res.status(500).json({ success: false, message: e.toString() });
    }
});

module.exports = router;
