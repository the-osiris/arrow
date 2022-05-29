const express = require("express");
const User = require("../models/user");

const router = express.Router();

// req.query: uId, hash
router.get("/verifyEmail", async (req, res) => {
    try {
        if (!(req.query.uId && req.query.hash))
            return res
                .status(400)
                .json({ success: false, message: "Invalid request params" });

        const user = await User.findOne({ uId: req.query.uId });

        if (!user)
            return res
                .status(401)
                .json({ success: false, message: "User not found" });

        if (Number(req.query.hash) === user.createdAt.getTime()) {
            user.emailValidation = true;
            await user.save();
            return res.status(200).json({ success: true });
        }
        return res
            .status(402)
            .json({ success: false, message: "Invalid request" });
    } catch (e) {
        console.log(e);
        res.status(400).send({ success: "false", message: e.toString() });
    }
});

module.exports = router;
