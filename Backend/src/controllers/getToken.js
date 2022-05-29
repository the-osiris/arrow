const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/getToken", async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
            res.status(401).send({
                success: "false",
                error: "Refresh Token not found",
            });
            return;
        }
        jwt.verify(
            refreshToken,
            "hello",
            {
                audience: "/getToken",
                issuer: "movie-engine",
            },
            async (error, refreshTokenPayload) => {
                if (error) {
                    res.status(402).send({
                        success: "false",
                        error: "Invalid Refresh Token",
                    });
                    return;
                }

                const user = await User.findOne({
                    uId: refreshTokenPayload.sub,
                    "tokens.token": refreshToken,
                }).lean();
                if (!user) {
                    res.status(403).send({
                        success: "false",
                        error: "Invalid refresh token",
                    });
                    return;
                }

                const payLoad = {
                    name: refreshTokenPayload.name,
                    email: refreshTokenPayload.email || "",
                    phone: refreshTokenPayload.phone || "",
                    photoUrl: refreshTokenPayload.photoUrl || "",
                    dob: refreshTokenPayload.dob || "",
                    gender: refreshTokenPayload.gender || "",
                    preferences: refreshTokenPayload.preferences,
                };
                const accessToken = jwt.sign(payLoad, "hemlo", {
                    expiresIn: 3600,
                    issuer: "movie-engine",
                    subject: refreshTokenPayload.sub,
                });
                res.status(200).json({
                    success: true,
                    accessToken,
                    refreshToken,
                    user: {
                        ...payLoad,
                        uId: refreshTokenPayload.sub,
                    },
                });
            }
        );
    } catch (e) {
        console.log(e);
        res.status(400).send({ success: "false", message: e.toString() });
    }
});

module.exports = router;
