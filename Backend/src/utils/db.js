const mongoose = require("mongoose");

const dbUri =
    "mongodb+srv://user_alpha-0:cTG0c73paGPHvs37@alpha-0.ac4wr.mongodb.net/naina?retryWrites=true&w=majority";
mongoose.connect(
    dbUri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    },
    (error, success) => {
        if (error) return console.log(error);
        console.log("Connected to Database");
    }
);
