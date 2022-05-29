const jwt = require("jsonwebtoken");

module.exports = (user) => {
    return new Promise(async (resolve, reject) => {
        const payLoad = {
            name: user.name,
            email: user.email || "",
            phone: user.phone || "",
            photoUrl: user.photoUrl || "",
            dob: user.dob || "",
            gender: user.gender || "",
            preferences: user.preferences,
        };

        const refreshToken = jwt.sign(payLoad, "hello", {
            expiresIn: "365d",
            audience: "/getToken",
            issuer: "movie-engine",
            subject: user.uId,
        });

        resolve(refreshToken);
    });
};
