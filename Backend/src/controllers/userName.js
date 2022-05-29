const express = require("express");
const User = require("../models/userHookless");

const router = express.Router();

//req.body: uId
router.post("/userName", async (req, res) => {
    try {
        const user = await User.findOne({ uId: req.body.uId }).lean();
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Username not available",
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Username available",
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.toString(),
        });
    }
});

module.exports = router;
