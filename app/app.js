//Join the club
//express로 서버 띄우기
"use strict";

const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const logger = require('./src/config/logger');

const app = express();
dotenv.config();

const accessLogStream = require("./src/config/log");

const home = require("./src/routers/home");

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(morgan('tiny', { stream: logger.stream }));
// app.use(morgan('common', { stream: accessLogStream }));

app.use("/", home);

module.exports = app;