const express = require("express");
const app = express();

var homecontroller = require("./Home/homepage");
app.use("/home",homecontroller);

var contactuscontroller = require("./Contactus/contactus");
app.use("/contactus",contactuscontroller);

var aboutuscontroller = require("./Aboutus/aboutus");
app.use("/aboutus",aboutuscontroller);

var sportscontroller = require("./Sports/sports");
app.use("/sports",sportscontroller);

module.exports = app;