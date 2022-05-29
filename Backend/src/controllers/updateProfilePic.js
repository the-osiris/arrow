const express = require("express");

const User = require("../models/user");
const uploadImage = require("../middlewares/uploadImage");
const auth = require("../middlewares/auth");

const router = express.Router();

//req.body: image
router.post("/updateProfilePic", auth, async (req, res) => {
    try {
        if (!req.body.image)
            return res
                .status(400)
                .json({ success: false, message: "Invalid Request Data" });

        const filePath =
            "profile/00/" +
            req.token.sub +
            "/" +
            new Date().getTime() +
            Math.floor(Math.random() * 899999 + 100000);

        const b64string = req.body.image.replace(
            /^data:image\/\w+;base64,/,
            ""
        );
        const imgBuffer = Buffer.from(b64string, "base64");
        const imgUrl = await uploadImage(imgBuffer, filePath);

        const user = await User.findOne({ uId: req.token.sub });
        user.photoUrl = imgUrl;
        await user.save();

        return res.status(200).json({ success: true, photoUrl: imgUrl });
    } catch (e) {
        console.log("Error in POST updateProfilePic at " + new Date());
        console.log("Error: " + e);
        res.status(500).json({ success: false, message: e.toString() });
    }
});

module.exports = router;
