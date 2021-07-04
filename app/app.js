//Join the club
//express로 서버 띄우기
"use strict";

const express = require("express");
// const bodyParsor = require("body-parser");
const app = express();
const dotenv = require("dotenv");
dotenv.config()

const home = require("./src/routers/home");

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));

app.use(express.urlencoded({ extended : true }));
app.use(express.json());

app.use("/", home);

module.exports = app;