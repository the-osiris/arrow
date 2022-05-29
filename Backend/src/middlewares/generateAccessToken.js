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

        const accessToken = jwt.sign(payLoad, "hemlo", {
            expiresIn: 3600,
            issuer: "movie-engine",
            subject: user.uId,
        });

        resolve(accessToken);
    });
};
