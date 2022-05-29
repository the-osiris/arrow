const express = require("express");

const User = require("../models/user");
const auth = require("../middlewares/auth");

const router = express.Router();

//req.body: refreshToken
router.post("/logout", auth, async (req, res) => {
    try {
        const payLoad = req.token;
        const user = await User.findOne({ uId: payLoad.sub });

        user.tokens = user.tokens.filter((token) => {
            if (token.token === req.body.refreshToken) {
                return false;
            }
            return true;
        });
        await user.save();
        res.status(200).json({ success: true, token: req.body.refreshToken });
    } catch (e) {
        res.status(500).send({ success: false, message: e.toString() });
    }
});

module.exports = router;
