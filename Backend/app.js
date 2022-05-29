const cors = require("cors");
const express = require("express");
require("./src/utils/db");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

//auth
const userName = require("./src/controllers/userName");
const register = require("./src/controllers/register");
const verifyEmail = require("./src/controllers/verifyEmail");
const login = require("./src/controllers/login");
const logout = require("./src/controllers/logout");
const getToken = require("./src/controllers/getToken");

//profile
const updateProfile = require("./src/controllers/updateProfile");
const updateProfilePic = require("./src/controllers/updateProfilePic");

const rateMovie = require("./src/controllers/rateMovie");
const getUser = require("./src/controllers/getUser");

//auth
app.use(userName);
app.use(register);
app.use(verifyEmail);
app.use(login);
app.use(logout);
app.use(getToken);

//profile
app.use(updateProfile);
app.use(updateProfilePic);

app.use(rateMovie);
app.use(getUser);

const clearRating = require("./src/controllers/clearRating");
app.use(clearRating);

app.listen(process.env.PORT || 8080, async () => {
  console.log(
    "Server running at http://localhost:" + (process.env.PORT || 8080)
  );
});
