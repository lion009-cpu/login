//Join the club
//express로 서버 띄우기
"use strict";

const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MySQLStore = require('express-mysql-session')(session);
const logger = require('./src/config/logger');
const jsdom = require("jsdom");
const JSDOM = jsdom.JSDOM;
const category = "B01003";
const symptom_code = "";
global.category = category;
global.symptom_code = symptom_code;

const app = express();
dotenv.config();

const accessLogStream = require("./src/config/log");

const home = require("./src/routers/home");

const IN_PROD = process.env.NODE_ENV === 'production'

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(cookieParser());
app.use(session({
    name: process.env.SESS_NAME,
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESS_SECRET,
    cookie: {
        // maxAge: process.env.SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD,
    },
    store: new MySQLStore({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    }),
}));

app.use(express.urlencoded({ extended : true }));
app.use(express.json());
app.use(morgan('tiny', { stream: logger.stream }));
// app.use(morgan('common', { stream: accessLogStream }));

app.use("/", home);

module.exports = app;