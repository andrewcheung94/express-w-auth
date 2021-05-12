const mongoose = require("mongoose");

const dbURL = process.env.URL;

mongoose
    .connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log(`MongoDB successfully connected at ${dbURL}`))
    .catch((err) => console.log(err));
