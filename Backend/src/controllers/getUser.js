const express = require("express");

const User = require("../models/user");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/getUser", auth, async (req, res) => {
    try {
        const user = await User.findOne({ uId: req.token.sub }).select({
            password: 0,
        });

        return res.status(200).json({ success: true, user });
    } catch (e) {
        console.log("Error in GET getUser at " + new Date());
        console.log("Error: " + e);
        res.status(500).json({ success: false, message: e.toString() });
    }
});

module.exports = router;
