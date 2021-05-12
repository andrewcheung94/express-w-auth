const express = require("express");
const cors = require('cors');
require("dotenv").config();
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const loginRoutes = require('./routes/login');


const app = express();
const port = 5000;

app.use(cors());
const db = require("./config/database");



app.use(express.json());

app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/login", loginRoutes);


app.listen(port, () => console.log(`server is running on port: ${port}`));

module.exports = app;
