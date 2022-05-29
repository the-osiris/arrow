const express = require("express");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const User = require("../models/userHookless");

const router = express.Router();

//req.body: uId, pwd, email, name
router.post("/register", async (req, res) => {
    try {
        if (!req.body.uId) req.body.uId = req.body.email;
        const _user = await User.findOne({ uId: req.body.uId }).lean();
        if (_user) {
            return res.status(400).json({
                success: false,
                message: "Username not available",
            });
        } else if (!validator.isEmail(req.body.email)) {
            return res.status(401).json({
                success: false,
                message: "Invalid email",
            });
        } else {
            const pwd = await bcrypt.hash(req.body.pwd, 8);
            const user = new User({
                uId: req.body.uId,
                name: req.body.name,
                email: req.body.email,
                password: pwd,
            });

            await user.save();

            return res.status(200).json({
                success: true,
                message: "User created",
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
