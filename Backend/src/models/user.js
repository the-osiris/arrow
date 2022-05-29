const mongoose = require("mongoose");
const userSchema = require("../schemas/user");

userSchema.pre("find", function (next) {
    this.setQuery({ ...this.getQuery(), emailValidation: true });
    // console.log(this.getQuery());
    next();
});

userSchema.pre("findOne", function (next) {
    this.setQuery({ ...this.getQuery(), emailValidation: true });
    next();
});

module.exports = mongoose.model("user", userSchema);
