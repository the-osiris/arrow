const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (authHeader && authHeader.replace("Bearer ", "")) {
        const token = authHeader.replace("Bearer ", "");
        jwt.verify(token, "hemlo", { issuer: "movie-engine" }, (err, user) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Authorization failed!!!",
                });
            }
            req.token = user;
            next();
        });
    } else {
        return res
            .status(400)
            .json({ success: false, message: "Authorization failed!!!" });
    }
};
