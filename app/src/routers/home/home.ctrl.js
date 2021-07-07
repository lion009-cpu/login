"use strict";

const logger = require("../../config/logger");
const User = require("../../models/User");
const Hint = require("../../models/Hint");
const Symptom = require("../../models/Symptom");

const output = {    
    hello: (req, res) =>{
        logger.info(`GET / 304 "홈 화면으로 이동"`);
        res.render("home/index");
    },    

    login: (req, res) => {
        logger.info(`GET /login 304 "로그인 화면으로 이동"`);
        res.render("home/login");
    },

    register: (req, res) => {
        logger.info(`GET /register 304 "가입 화면으로 이동"`);
        res.render("home/register");
    },

    navigation: async (req, res) => {
        const hint = new Hint();
        const response = await hint.navigation();
        const navi = JSON.stringify(response); 

        logger.info(`GET /navigation 304 "안내 화면으로 이동"`);
        res.render("home/navigation", {data:response});
    },

    symptom: async (req, res) => {
        const symptom = new Symptom();
        const response = await symptom.navigation();
        const navi = JSON.stringify(response); 

        logger.info(`GET /symptom 304 "대표증상 화면으로 이동"`);
        res.render("home/symptom", {data:response});
    },
}

const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();

        const url = {
            method: "POST",
            path: "/login",
            status: response.err ? 400 : 200,
        };

        log(response, url);
        return res.status(url.status).json(response);        
    },

    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();

        const url = {
            method: "POST",
            path: "/register",
            status: response.err ? 400 : 201,
        };

        log(response, url);
        return res.status(url.status).json(response);        
    },
}

module.exports = {
    output,
    process,
}

const log = (response, url) => {
    if(response.err)
        logger.error(
            `${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.err}`
        );
    else
        logger.info(
            `${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.msg || ""}`
        );
}