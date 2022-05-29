const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const generateAccessToken = require("../middlewares/generateAccessToken");
const generateRefreshToken = require("../middlewares/generateRefreshToken");

const router = express.Router();

//req.body: uId, pwd, geoData
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ uId: req.body.uId });
        if (user) {
            const isValid = await bcrypt.compare(req.body.pwd, user.password);
            if (isValid) {
                const accessToken = await generateAccessToken(user);
                const refreshToken = await generateRefreshToken(user);

                if (user.tokens.length > 4) {
                    const tempArray = [];
                    for (
                        let counter = user.tokens.length - 4;
                        counter < user.tokens.length;
                        ++counter
                    )
                        tempArray.push(user.tokens[counter]);
                    user.tokens = tempArray;
                }
                user.tokens.push({
                    token: refreshToken,
                    geoData: req.body.geoData || {},
                });
                await user.save();

                const isFirstLogin = user.gender ? false : true;
                return res.json({
                    success: true,
                    user,
                    accessToken,
                    refreshToken,
                    isFirstLogin,
                });
            } else
                return res
                    .status(401)
                    .json({ success: false, message: "Invalid password" });
        } else {
            return res.status(404).json({
                success: false,
                message: "User does not exist",
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
