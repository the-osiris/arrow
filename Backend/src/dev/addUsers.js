require("../utils/db");
const User = require("../models/userHookless");
const bcrypt = require("bcryptjs");

const driver = async () => {
    try {
        const arr = [];
        for (let i = 1; i <= 610; ++i) {
            arr.push("random" + i.toString().padStart(3, "0"));
        }
        await Promise.all(
            arr.map(async (id) => {
                const pwd = await bcrypt.hash(id, 8);
                const user = new User({
                    uId: id,
                    name: id,
                    email: "zero.zero.zero.alpha@gmail.com",
                    password: pwd,
                });

                await user.save();
                console.log(id);
            })
        );

        console.log("Done");
    } catch (e) {
        console.log("Error encountered\nError: " + e);
    }
};

driver();
